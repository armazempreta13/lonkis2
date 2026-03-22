import express from 'express';
import { z } from 'zod';
import { dbAll, dbGet, dbRun } from '../db.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

const productSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  image: z.string().url().optional(),
  colors: z.array(z.string()).optional(),
  badge: z.string().optional(),
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await dbAll('SELECT * FROM products ORDER BY created_at DESC');
    const parsedProducts = products.map(product => ({
      ...product,
      colors: JSON.parse(product.colors || '[]'),
    }));
    res.json(parsedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await dbGet('SELECT * FROM products WHERE id = ?', [id]);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({
      ...product,
      colors: JSON.parse(product.colors || '[]'),
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create product (admin only)
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const data = productSchema.parse(req.body);
    const { name, category, price, image, colors, badge } = data;

    const result = await dbRun('INSERT INTO products (name, category, price, image, colors, badge) VALUES (?, ?, ?, ?, ?, ?)', [name, category, price, image || null, JSON.stringify(colors || []), badge || null]);

    res.status(201).json({ id: result.lastID });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Update product (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const data = productSchema.parse(req.body);
    const { name, category, price, image, colors, badge } = data;

    const result = await dbRun('UPDATE products SET name = ?, category = ?, price = ?, image = ?, colors = ?, badge = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, category, price, image || null, JSON.stringify(colors || []), badge || null, id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const result = await dbRun('DELETE FROM products WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;