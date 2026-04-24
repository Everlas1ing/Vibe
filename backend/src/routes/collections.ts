import { Router } from 'express';
import { pool } from '../models/db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM collections ORDER BY created_at DESC`);
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM collections WHERE slug = $1`, [req.params.slug]);
        if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;