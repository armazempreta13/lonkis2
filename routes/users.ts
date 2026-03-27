import express from 'express';
import { z } from 'zod';
import { dbAll, dbGet, dbRun } from '../db.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const users = await dbAll('SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by id (admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const user = await dbGet('SELECT id, email, name, role, created_at FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user role (admin only)
router.put('/:id/role', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'customer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const result = await dbRun('UPDATE users SET role = ? WHERE id = ?', [role, id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User role updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting the last admin
    const adminCount = await dbGet('SELECT COUNT(*) as count FROM users WHERE role = ?', ['admin']);
    const userToDelete = await dbGet('SELECT role FROM users WHERE id = ?', [id]);

    if (userToDelete?.role === 'admin' && adminCount.count <= 1) {
      return res.status(400).json({ error: 'Cannot delete the last admin user' });
    }

    const result = await dbRun('DELETE FROM users WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;