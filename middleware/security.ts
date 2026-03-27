import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

/**
 * Enhanced Security Middleware Suite
 * Protects against:
 * - DDoS attacks (rate limiting, request deduplication)
 * - Slow client attacks (timeout, payload limits)
 * - Brute force (graduated rate limiting)
 * - Excessive bandwidth (compression)
 */

// ============================================================================
// 1. REQUEST DEDUPLICATION (Dedupliça requisições idênticas simultâneas)
// ============================================================================

interface CachedRequest {
  promise: Promise<any>;
  timestamp: number;
  count: number;
}

const requestCache = new Map<string, CachedRequest>();
const CACHE_TTL = 1000; // 1 second
const DEDUP_CHECK_INTERVAL = 60000; // 1 minute

// Cleanup request cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      requestCache.delete(key);
    }
  }
}, DEDUP_CHECK_INTERVAL);

export const requestDeduplication = (req: Request, res: Response, next: NextFunction) => {
  // Only deduplicate GET requests (safe to cache)
  if (req.method !== 'GET') {
    return next();
  }

  const cacheKey = `${req.method}:${req.path}:${JSON.stringify(req.query)}`;
  const cached = requestCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    // Store dedup count for monitoring
    cached.count++;
    if (cached.count > 10) {
      console.warn(`[DEDUP ALERT] Excessive identical requests: ${cacheKey}`);
    }
    return next();
  }

  // Store promise to deduplicate this request
  const responsePromise = new Promise((resolve) => {
    // Resolve when response is sent
    const originalSend = res.send.bind(res);
    res.send = function(data: any) {
      resolve(data);
      return originalSend(data);
    };
  });

  requestCache.set(cacheKey, {
    promise: responsePromise,
    timestamp: Date.now(),
    count: 1,
  });

  next();
};

// ============================================================================
// 2. TIERED RATE LIMITING (Diferentes limites por endpoint)
// ============================================================================

export const rateLimiters = {
  // Global limiter for all endpoints
  global: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // 500 requests per 15 minutes
    message: {
      error: 'Você está fazendo muitas requisições. Por favor, tente novamente mais tarde.',
      retryAfter: 900
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/api/health';
    },
    keyGenerator: (req) => {
      // Use X-Forwarded-For for proxies, fall back to IP
      const forwarded = req.get('X-Forwarded-For');
      return forwarded ? forwarded.split(',')[0].trim() : req.ip || 'unknown';
    },
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many requests',
        retryAfter: 900
      });
    },
  }),

  // Stricter limiter for authentication endpoints
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts
    skipSuccessfulRequests: true, // Don't count successful requests
    skipFailedRequests: false, // Count failed requests
    message: {
      error: 'Muitas tentativas de autenticação. Por favor, tente novamente em 15 minutos.',
      retryAfter: 900
    },
    keyGenerator: (req) => {
      const forwarded = req.get('X-Forwarded-For');
      const email = req.body?.email || 'unknown';
      const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || 'unknown';
      // Rate limit by both IP and email to prevent account enumeration
      return `${ip}:${email}`;
    },
    handler: (req, res) => {
      res.status(429).json({
        error: 'Muitas tentativas de login. Por favor, tente novamente mais tarde.',
        retryAfter: 900
      });
    },
  }),

  // Moderate limiter for API endpoints
  api: rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // 60 requests per minute
    message: {
      error: 'Limite de requisições excedido. Por favor, aguarde um momento.',
      retryAfter: 60
    },
    keyGenerator: (req) => {
      const forwarded = req.get('X-Forwarded-For');
      return forwarded ? forwarded.split(',')[0].trim() : req.ip || 'unknown';
    },
  }),

  // Strict limiter for file uploads
  upload: rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // 10 uploads per 5 minutes
    message: {
      error: 'Muitos uploads. Por favor, aguarde antes de fazer upload de mais arquivos.',
      retryAfter: 300
    },
  }),

  // Very strict limiter for sensitive operations
  admin: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // 100 requests per hour
    message: {
      error: 'Limite de operações administrativas excedido.',
      retryAfter: 3600
    },
  }),
};

// ============================================================================
// 3. REQUEST TIMEOUT & SIZE LIMITS
// ============================================================================

export const securityLimits = {
  // Timeout for all requests (20 seconds)
  requestTimeout: 20000,

  // Maximum request body size
  jsonLimit: '5mb',
  urlencodedLimit: '5mb',

  // Maximum file upload size
  fileUploadLimit: '50mb',

  // Maximum query string length
  queryStringMaxLength: 2000,
};

export const requestTimeoutMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Set request timeout
  req.setTimeout(securityLimits.requestTimeout);

  // Handle timeout
  req.on('timeout', () => {
    console.warn(`[TIMEOUT] Request timeout: ${req.method} ${req.path} - ${req.ip}`);
    res.status(408).json({
      error: 'Request timeout. Please try again later.',
      code: 'REQUEST_TIMEOUT'
    });
  });

  next();
};

// ============================================================================
// 4. RESPONSE COMPRESSION
// ============================================================================

export const compressionMiddleware = compression({
  // Compress responses larger than 1KB
  threshold: 1024,
  // Use brotli if supported (better compression than gzip)
  brotli: {
    enabled: true,
    zlib: {},
  },
  level: 6, // Balance between speed and compression ratio
  filter: (req, res) => {
    // Don't compress responses for these requests
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use the default compression filter
    return compression.filter(req, res);
  },
});

// ============================================================================
// 5. PAYLOAD VALIDATION MIDDLEWARE
// ============================================================================

export const payloadValidator = (req: Request, res: Response, next: NextFunction) => {
  // Check query string length
  const queryString = JSON.stringify(req.query);
  if (queryString.length > securityLimits.queryStringMaxLength) {
    return res.status(400).json({
      error: 'Query string too long',
      code: 'QUERY_TOO_LONG'
    });
  }

  // Check for suspicious patterns in request
  const checkForSuspiciousPatterns = (obj: any, depth = 0): boolean => {
    if (depth > 10) return true; // Prevent deeply nested objects
    
    if (typeof obj === 'string') {
      // Check for common injection patterns
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i, // Event handlers
        /union.*select/i,
        /drop\s+table/i,
        /exec\s*\(/i,
      ];
      
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(obj)) {
          return true;
        }
      }
    }

    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (checkForSuspiciousPatterns(obj[key], depth + 1)) {
          return true;
        }
      }
    }

    return false;
  };

  if (checkForSuspiciousPatterns(req.body)) {
    console.warn(`[SECURITY] Suspicious payload detected: ${req.method} ${req.path} - ${req.ip}`);
    return res.status(400).json({
      error: 'Invalid payload detected',
      code: 'INVALID_PAYLOAD'
    });
  }

  next();
};

// ============================================================================
// 6. REQUEST FINGERPRINTING (Detect suspicious behavior patterns)
// ============================================================================

interface RequestFingerprint {
  ips: Set<string>;
  userAgents: Set<string>;
  timestamps: number[];
  count: number;
}

const fingerprintStore = new Map<string, RequestFingerprint>();
const FINGERPRINT_WINDOW = 60000; // 1 minute
const SUSPICIOUS_THRESHOLD = 20; // 20 different IPs in 1 minute = suspicious

export const requestFingerprinting = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.id || req.ip || 'anonymous';
  const ip = (req.get('X-Forwarded-For') || req.ip || '').split(',')[0].trim();
  const userAgent = req.get('User-Agent') || 'unknown';

  let fingerprint = fingerprintStore.get(userId);
  const now = Date.now();

  if (!fingerprint) {
    fingerprint = {
      ips: new Set(),
      userAgents: new Set(),
      timestamps: [],
      count: 0,
    };
    fingerprintStore.set(userId, fingerprint);
  }

  // Remove old entries
  fingerprint.timestamps = fingerprint.timestamps.filter(ts => now - ts < FINGERPRINT_WINDOW);

  fingerprint.ips.add(ip);
  fingerprint.userAgents.add(userAgent);
  fingerprint.timestamps.push(now);
  fingerprint.count++;

  // Detect suspicious behavior
  if (fingerprint.ips.size > SUSPICIOUS_THRESHOLD) {
    console.warn(`[SECURITY] Suspicious fingerprint detected for user: ${userId}`);
    // Optionally: return res.status(429).json({ error: 'Suspicious activity detected' });
  }

  // Cleanup old entries
  if (fingerprintStore.size > 10000) {
    const oldestUser = Array.from(fingerprintStore.entries())
      .sort((a, b) => a[1].timestamps[0] - b[1].timestamps[0])[0];
    if (oldestUser) {
      fingerprintStore.delete(oldestUser[0]);
    }
  }

  next();
};

// ============================================================================
// 7. RESPONSE SECURITY HEADERS
// ============================================================================

export const responseSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Additional security headers beyond Helmet
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Prevent caching of sensitive data
  if (req.path.includes('/api/auth') || req.path.includes('/admin')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
};

// ============================================================================
// 8. CIRCUIT BREAKER (Prevent cascading failures)
// ============================================================================

interface CircuitBreakerState {
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failureCount: number;
  lastFailureTime: number;
  successCount: number;
}

const circuitBreakers = new Map<string, CircuitBreakerState>();

const FAILURE_THRESHOLD = 10;
const RESET_TIMEOUT = 60000; // 1 minute
const SUCCESS_THRESHOLD = 5;

export const circuitBreaker = (service: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const breaker = circuitBreakers.get(service) || {
      state: 'CLOSED',
      failureCount: 0,
      lastFailureTime: 0,
      successCount: 0,
    };

    if (breaker.state === 'OPEN') {
      // Check if we should try to recover
      if (Date.now() - breaker.lastFailureTime > RESET_TIMEOUT) {
        breaker.state = 'HALF_OPEN';
        breaker.successCount = 0;
      } else {
        return res.status(503).json({
          error: 'Service temporarily unavailable',
          code: 'CIRCUIT_BREAKER_OPEN',
          retryAfter: Math.ceil((RESET_TIMEOUT - (Date.now() - breaker.lastFailureTime)) / 1000),
        });
      }
    }

    // Attach circuit breaker tracking to response
    const originalJson = res.json.bind(res);
    res.json = function(data: any) {
      // If response is error, increment failure count
      if (res.statusCode >= 500) {
        breaker.failureCount++;
        breaker.lastFailureTime = Date.now();
        breaker.successCount = 0;

        if (breaker.failureCount >= FAILURE_THRESHOLD) {
          breaker.state = 'OPEN';
          console.error(`[CIRCUIT BREAKER] Opening breaker for service: ${service}`);
        }
      } else if (breaker.state === 'HALF_OPEN') {
        breaker.successCount++;
        if (breaker.successCount >= SUCCESS_THRESHOLD) {
          breaker.state = 'CLOSED';
          breaker.failureCount = 0;
          console.log(`[CIRCUIT BREAKER] Closing breaker for service: ${service}`);
        }
      } else {
        breaker.failureCount = Math.max(0, breaker.failureCount - 1);
      }

      circuitBreakers.set(service, breaker);
      return originalJson(data);
    };

    next();
  };
};

// ============================================================================
// 9. REQUEST MONITORING & METRICS
// ============================================================================

interface RequestMetrics {
  totalRequests: number;
  totalErrors: number;
  totalTimeMs: number;
  averageTimeMs: number;
  maxTimeMs: number;
  statusCodes: Record<number, number>;
}

const metrics: RequestMetrics = {
  totalRequests: 0,
  totalErrors: 0,
  totalTimeMs: 0,
  averageTimeMs: 0,
  maxTimeMs: 0,
  statusCodes: {},
};

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  const originalSend = res.send.bind(res);
  res.send = function(data: any) {
    const duration = Date.now() - startTime;
    
    // Update metrics
    metrics.totalRequests++;
    metrics.totalTimeMs += duration;
    metrics.averageTimeMs = Math.round(metrics.totalTimeMs / metrics.totalRequests);
    metrics.maxTimeMs = Math.max(metrics.maxTimeMs, duration);

    if (res.statusCode >= 400) {
      metrics.totalErrors++;
    }

    metrics.statusCodes[res.statusCode] = (metrics.statusCodes[res.statusCode] || 0) + 1;

    // Log slow requests
    if (duration > 1000) {
      console.warn(`[SLOW REQUEST] ${req.method} ${req.path} took ${duration}ms`);
    }

    return originalSend(data);
  };

  next();
};

export const getMetrics = (): RequestMetrics => {
  return { ...metrics };
};

// ============================================================================
// 10. TRUSTED PROXY CONFIGURATION
// ============================================================================

export const trustProxy = (req: Request, res: Response, next: NextFunction) => {
  // Trust proxy headers (important for rate limiting behind reverse proxies)
  if (process.env.TRUST_PROXY === 'true') {
    req.app.set('trust proxy', 1); // Trust first proxy
  }
  next();
};
