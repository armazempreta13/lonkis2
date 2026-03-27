import express, { Response } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { dbRun, dbGet, dbAll } from '../db.js';
import { generateToken } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Register
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    // Check if user exists
    const existingUser = await dbGet('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe com este email' });
    }

    // Hash password with higher cost
    const passwordHash = await bcrypt.hash(password, 12);

    // Insert user
    const result = await dbRun('INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)', [email, passwordHash, name, 'customer']);

    const user = { id: result.lastID, email, role: 'customer' };
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: { id: user.id, email, name, role: user.role },
      message: 'Conta criada com sucesso'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
});

// Login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await dbGet('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    // Log successful login
    console.log(`Login successful: ${user.email} (${user.role})`);

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      message: 'Login realizado com sucesso'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
});

import { authenticateToken, AuthRequest } from '../middleware/auth.js';

// Verify token
router.get('/verify', authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

export default router;