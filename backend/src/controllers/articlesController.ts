import { Request, Response } from 'express';
import { pool } from '../models/db';

export const getArticles = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;
        let query = `
      SELECT a.*, c.name as category_name 
      FROM articles as a 
      LEFT JOIN categories c ON a.category_id = c.id
    `;
        const params: any[] = [];
        if (category) {
            query += ` WHERE c.slug = $1`;
            params.push(category);
        }
        query += ` ORDER BY a.published_at DESC`;
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getArticleBySlug = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT a.*, c.name as category_name 
       FROM articles a 
       LEFT JOIN categories c ON a.category_id = c.id 
       WHERE a.slug = $1`,
            [req.params.slug]
        );
        if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};