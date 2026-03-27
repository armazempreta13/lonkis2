import express from 'express';
import { z } from 'zod';
import { dbAll, dbRun } from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

const repairSchema = z.object({
  device_model: z.string().min(1),
  issue_description: z.string().min(10),
  estimated_cost: z.number().positive().optional(),
});

// Get all repair orders (admin only)
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const repairs = await dbAll('SELECT * FROM repair_orders ORDER BY created_at DESC');
    res.json(repairs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create repair order
router.post('/', async (req, res) => {
  try {
    const data = repairSchema.parse(req.body);
    const { device_model, issue_description, estimated_cost } = data;

    const result = await dbRun('INSERT INTO repair_orders (device_model, issue_description, estimated_cost) VALUES (?, ?, ?)', [device_model, issue_description, estimated_cost || null]);

    res.status(201).json({ id: result.lastID });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Update repair status (admin only)
router.put('/:id/status', authenticateToken, async (req: AuthRequest, res) => {

  try {
    const { id } = req.params;
    const { status, estimated_cost } = req.body;

    if (!['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await dbRun('UPDATE repair_orders SET status = ?, estimated_cost = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, estimated_cost || null, id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Repair order not found' });
    }

    res.json({ message: 'Repair order updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;