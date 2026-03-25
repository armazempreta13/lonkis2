import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import net from 'net';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from './db.js';
import { auditLog } from './middleware/audit.js';
import {
  rateLimiters,
  compressionMiddleware,
  requestTimeoutMiddleware,
  payloadValidator,
  requestFingerprinting,
  responseSecurityHeaders,
  metricsMiddleware,
  getMetrics,
  circuitBreaker,
} from './middleware/security.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import quoteRoutes from './routes/quotes.js';
import repairRoutes from './routes/repairs.js';
import userRoutes from './routes/users.js';
import googleReviewsRoutes from './routes/googleReviews.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3006);
  const HMR_PORT = Number(process.env.HMR_PORT || 0);

  const testPort = (port: number) => new Promise<boolean>((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => server.close(() => resolve(true)));
    server.listen(port, '0.0.0.0');
  });

  const getAvailablePort = async (start: number) => {
    let candidate = start;
    while (!(await testPort(candidate))) {
      candidate += 1;
    }
    return candidate;
  };

  // Dev HMR port resolver (needed for CSP connectSrc)
  let hmrPort: number | undefined = undefined;
  if (process.env.NODE_ENV !== 'production') {
    hmrPort = await getAvailablePort(HMR_PORT > 0 ? HMR_PORT : 24690);
  }

  // =========================================================================
  // CORS & SECURITY CONFIGURATION FOR PRODUCTION
  // =========================================================================

  // Get domain from environment or use current host
  const getOrigins = () => {
    if (process.env.CORS_ORIGIN) {
      // Allow multiple origins from env (comma-separated)
      return process.env.CORS_ORIGIN.split(',').map(o => o.trim());
    }
    
    if (process.env.NODE_ENV === 'production') {
      // In production without CORS_ORIGIN, reject cross-origin requests
      return [];
    }

    // Development: allow local ports
    return ['http://localhost:5173', 'http://localhost:3006', 'http://127.0.0.1:5173', 'http://127.0.0.1:3006'];
  };

  const connectSrcForCSP = () => {
    const sources = ["'self'"];
    
    if (process.env.NODE_ENV === 'production') {
      // Production: only allow self
      return sources;
    }

    // Development: add HMR ports for Vite hot reload
    sources.push('ws://localhost', 'ws://127.0.0.1');
    if (hmrPort) {
      sources.push(`ws://localhost:${hmrPort}`);
      sources.push(`ws://127.0.0.1:${hmrPort}`);
    }
    
    // Add production ports for backup HMR
    sources.push('ws://localhost:24683', 'ws://localhost:24690', 'ws://localhost:24691', 'ws://localhost:24692');
    
    return sources;
  };

  const origins = getOrigins();
  const connectSrc = connectSrcForCSP();

  // =========================================================================
  // SECURITY MIDDLEWARE STACK (Order matters!)
  // =========================================================================

  // 1. Trust proxy configuration (for rate limiting behind proxies)
  if (process.env.TRUST_PROXY === 'true') {
    app.set('trust proxy', 1);
  }

  // 2. Request timeout
  app.use(requestTimeoutMiddleware);

  // 3. Response compression (reduces bandwidth usage, good for scalability)
  app.use(compressionMiddleware);

  // 4. Security headers (Helmet)
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        connectSrc,
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        frameSrc: ["'self'", "https://www.google.com", "https://www.google.com/maps"],
        objectSrc: ["'none'"]
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }
  }));

  // 5. Additional security headers
  app.use(responseSecurityHeaders);

  // 6. CORS configuration (restrictive for security)
  if (origins.length === 0 && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  CORS_ORIGIN not set in production! Cross-origin requests will be blocked.');
    console.warn('   Set CORS_ORIGIN environment variable to your domain(s) to fix this.');
  }

  app.use(cors({
    origin: origins.length > 0 ? origins : false, // false = deny all in production without CORS_ORIGIN
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    maxAge: 86400, // 24 hours
  }));

  // 7. Image caching middleware (Cloudflare optimization)
  // Serves images with aggressive caching and compression headers
  app.use((req, res, next) => {
    // Only apply to image requests
    if (/\.(png|jpg|jpeg|gif|webp|avif|svg)$/i.test(req.path)) {
      // Long-term caching (1 year) for versioned/hashed images
      if (/\.[a-f0-9]{8,}\.(png|jpg|jpeg|gif|webp|avif)$/i.test(req.path)) {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
        res.set('CDN-Cache-Control', 'max-age=31536000');
      } else {
        // Standard caching for other images
        res.set('Cache-Control', 'public, max-age=604800'); // 7 days
        res.set('CDN-Cache-Control', 'max-age=604800');
      }
      
      // Allow Cloudflare to serve these from cache
      res.set('Vary', 'Accept-Encoding');
      res.set('X-Content-Type-Options', 'nosniff');
    }
    next();
  });

  // 8. Body parsing with size limits
  app.use(express.json({ limit: '5mb' })); // Reduced from 10mb
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  // 9. Payload validation (detects injection attempts)
  app.use(payloadValidator);

  // 10. Global rate limiter (applies to all endpoints except /health)
  app.use(rateLimiters.global);

  // 11. Request fingerprinting (detects suspicious patterns)
  app.use(requestFingerprinting);

  // 12. Metrics collection (for monitoring)
  app.use(metricsMiddleware);

  // 13. Audit logging
  app.use(auditLog);

  // =========================================================================
  // API ROUTES WITH SPECIFIC PROTECTIONS
  // =========================================================================

  // Authentication routes (stricter rate limiting)
  app.use('/api/auth', rateLimiters.auth, authRoutes);

  // Product routes (standard rate limiting + circuit breaker)
  app.use('/api/products', rateLimiters.api, circuitBreaker('products'), productRoutes);

  // Quote routes (standard rate limiting)
  app.use('/api/quotes', rateLimiters.api, quoteRoutes);

  // Repair routes (standard rate limiting)
  app.use('/api/repairs', rateLimiters.api, repairRoutes);

  // User routes (stricter rate limiting + circuit breaker)
  app.use('/api/users', rateLimiters.api, circuitBreaker('users'), userRoutes);

  // Google Reviews proxy routes (no rate limiting, cached)
  app.use('/api/google-reviews', googleReviewsRoutes);

  // =========================================================================
  // HEALTH CHECK & METRICS ENDPOINTS
  // =========================================================================

  // Health check endpoint (no rate limiting)
  app.get('/api/health', (req, res) => {
    const metrics = getMetrics();
    res.json({
      status: 'ok',
      message: 'LK Imports API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    });
  });

  // Metrics endpoint (admin only)
  app.get('/api/metrics', (req, res) => {
    // TODO: Add authentication check here
    const metrics = getMetrics();
    res.json(metrics);
  });

  // =========================================================================
  // CREATE DEFAULT ADMIN USER
  // =========================================================================

  const createAdmin = async () => {
    try {
      const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@lkimports.com');
      if (!adminExists) {
        const passwordHash = await bcrypt.hash('admin123', 10);
        db.prepare('INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)').run('admin@lkimports.com', passwordHash, 'Admin', 'admin');
        console.log('⚠️  DEFAULT ADMIN CREATED: admin@lkimports.com / admin123');
        console.log('⚠️  CHANGE THESE CREDENTIALS IN PRODUCTION!');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  createAdmin();

  // =========================================================================
  // VITE DEVELOPMENT SERVER OR STATIC PRODUCTION BUILD
  // =========================================================================

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { port: hmrPort },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    console.log(`🔄 HMR rodando em porta ${hmrPort}`);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1d', // Cache assets for 1 day
      etag: false // Disable etag for faster serving
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // =========================================================================
  // START SERVER
  // =========================================================================

  const serverPort = await getAvailablePort(PORT);

  app.listen(serverPort, '0.0.0.0', () => {
    const mode = process.env.NODE_ENV === 'production' ? '🚀 PRODUCTION' : '🧪 DEVELOPMENT';
    console.log(`${mode} - Server running on http://localhost:${serverPort}`);
    console.log('');
    console.log('🔐 Security Features Enabled:');
    console.log('  ✅ Global Rate Limiting (500 req/15min)');
    console.log('  ✅ Auth Rate Limiting (5 attempts/15min)');
    console.log('  ✅ Strict Payload Validation');
    console.log('  ✅ Request Fingerprinting');
    console.log('  ✅ Circuit Breaker Pattern');
    console.log('  ✅ Response Compression (Brotli + Gzip)');
    console.log('  ✅ Request Timeout Protection');
    console.log('  ✅ Security Headers (Helmet + Custom)');
    console.log('  ✅ Audit Logging');
    console.log('  ✅ Performance Monitoring');
    console.log('');
    
    if (process.env.NODE_ENV === 'production') {
      console.log('📋 Production Configuration:');
      console.log(`  - CORS_ORIGIN: ${process.env.CORS_ORIGIN || '❌ NOT SET (blocking cross-origin)'}`) ;
      console.log(`  - TRUST_PROXY: ${process.env.TRUST_PROXY === 'true' ? '✅ Enabled' : '⚠️  Disabled'}`);
      console.log(`  - JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ NOT SET (using default - INSECURE!)'}`);
      console.log('');
      
      if (!process.env.CORS_ORIGIN) {
        console.warn('⚠️  WARN: CORS_ORIGIN not configured. Your frontend cannot make requests to this API!');
        console.warn('   Set CORS_ORIGIN=https://yourdomain.com in your environment variables.');
      }
      if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-super-secret-jwt-key-change-this-in-production') {
        console.error('❌ ERROR: JWT_SECRET is using default value! This is a CRITICAL security issue!');
        console.error('   Set JWT_SECRET to a strong random value (40+ characters).');
      }
    }
  });
}

startServer().catch(console.error);
