import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { AuthRequest } from './auth.js';

const logFile = path.join(process.cwd(), 'logs', 'audit.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFile))) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

export const auditLog = (req: AuthRequest, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('User-Agent') || 'unknown';
  const user = req.user ? `${req.user.email} (${req.user.role})` : 'unauthenticated';

  const logEntry = JSON.stringify({
    timestamp,
    ip,
    method,
    url,
    user,
    userAgent,
    statusCode: res.statusCode
  }) + '\n';

  // Log to file asynchronously
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Failed to write audit log:', err);
    }
  });

  // Log important actions to console
  if (req.user && (method !== 'GET' || url.includes('/admin'))) {
    console.log(`[${timestamp}] ${method} ${url} - ${user} - ${ip}`);
  }

  next();
};