import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso necessário' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expirado' });
      }
      return res.status(403).json({ error: 'Token inválido' });
    }

    const userData = decoded as { id: number; email: string; role: string };

    // Verify user still exists and role hasn't changed
    try {
      const user: any = await db.get('SELECT id, email, role FROM users WHERE id = ? AND email = ?', [userData.id, userData.email]);
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      next();
    } catch (dbError) {
      console.error('Database error in auth middleware:', dbError);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Autenticação necessária' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso de administrador necessário' });
  }
  next();
};

export const generateToken = (user: { id: number; email: string; role: string }) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '24h',
    issuer: 'lk-imports-api',
    audience: 'lk-imports-client'
  });
};