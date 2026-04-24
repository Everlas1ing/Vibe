import { Response } from 'express';
import { pool } from '../models/db';
import { AuthRequest } from '../middleware/auth';

export const getSaved = async (req: AuthRequest, res: Response) => {
    const result = await pool.query(
        `SELECT a.*, c.name as category_name 
     FROM saved_articles sa 
     JOIN articles a ON sa.article_id = a.id 
     LEFT JOIN categories c ON a.category_id = c.id 
     WHERE sa.user_id = $1 
     ORDER BY sa.saved_at DESC`,
        [req.userId]
    );
    res.json(result.rows);
};

export const toggleSave = async (req: AuthRequest, res: Response) => {
    const { articleId } = req.params;
    const exists = await pool.query(
        `SELECT id FROM saved_articles WHERE user_id = $1 AND article_id = $2`,
        [req.userId, articleId]
    );
    if (exists.rows.length > 0) {
        await pool.query(`DELETE FROM saved_articles WHERE user_id = $1 AND article_id = $2`, [req.userId, articleId]);
        res.json({ saved: false });
    } else {
        await pool.query(`INSERT INTO saved_articles (user_id, article_id) VALUES ($1, $2)`, [req.userId, articleId]);
        res.json({ saved: true });
    }
};