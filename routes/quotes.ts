import express from 'express';
import { z } from 'zod';
import { dbAll, dbRun } from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

const quoteSchema = z.object({
  customer_name: z.string().min(2),
  customer_phone: z.string().min(10),
  device_model: z.string().min(1),
  service_name: z.string().min(1),
  price: z.string().optional(),
});

// Get all quotes (admin only)
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const quotes = await dbAll('SELECT * FROM quotes ORDER BY created_at DESC');
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create quote
router.post('/', async (req, res) => {
  try {
    const data = quoteSchema.parse(req.body);
    const { customer_name, customer_phone, device_model, service_name, price } = data;

    const result = await dbRun('INSERT INTO quotes (customer_name, customer_phone, device_model, service_name, price) VALUES (?, ?, ?, ?, ?)', [customer_name, customer_phone, device_model, service_name, price || null]);

    res.status(201).json({ id: result.lastID });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Update quote status (admin only)
router.put('/:id/status', authenticateToken, async (req: AuthRequest, res) => {

  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await dbRun('UPDATE quotes SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    res.json({ message: 'Quote status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;