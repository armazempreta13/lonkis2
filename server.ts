import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import net from 'net';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcrypt';
import db from './db.js';
import { auditLog } from './middleware/audit.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import quoteRoutes from './routes/quotes.js';
import repairRoutes from './routes/repairs.js';
import userRoutes from './routes/users.js';

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

  // Dev HMR port resolver for dynamic CSP
  const hmrPort = process.env.NODE_ENV !== 'production'
    ? await getAvailablePort(HMR_PORT > 0 ? HMR_PORT : 24690)
    : undefined;

  const connectSrc = ["'self'", 'ws://localhost'];
  if (process.env.NODE_ENV !== 'production' && hmrPort) {
    connectSrc.push(`ws://localhost:${hmrPort}`);
  } else {
    connectSrc.push('ws://localhost:24683', 'ws://localhost:24690', 'ws://localhost:24691', 'ws://localhost:24692');
  }

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Muitas tentativas, tente novamente mais tarde.',
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 auth attempts per windowMs
    message: 'Muitas tentativas de login, tente novamente mais tarde.',
  });

  app.use(limiter);
  app.use('/api/auth', authLimiter);

  // Middleware
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
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Audit logging
  app.use(auditLog);

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/quotes', quoteRoutes);
  app.use('/api/repairs', repairRoutes);
  app.use('/api/users', userRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'LK Imports API is running', timestamp: new Date().toISOString() });
  });

  // Create default admin user
  const createAdmin = async () => {
    try {
      const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@lkimports.com');
      if (!adminExists) {
        const passwordHash = await bcrypt.hash('admin123', 10);
        db.prepare('INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)').run('admin@lkimports.com', passwordHash, 'Admin', 'admin');
        console.log('Admin user created: admin@lkimports.com / admin123');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  createAdmin();

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { port: hmrPort },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    console.log(`HMR rodando em porta ${hmrPort}`);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const serverPort = await getAvailablePort(PORT);

  app.listen(serverPort, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${serverPort}`);
  });
}

startServer().catch(console.error);
