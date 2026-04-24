import { Response } from 'express';
import { pool } from '../models/db';
import { AuthRequest } from '../middleware/auth';

export const getComments = async (req: AuthRequest, res: Response) => {
    const { articleId } = req.params;
    const result = await pool.query(
        `SELECT c.*, u.username, u.avatar 
     FROM comments c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.article_id = $1 
     ORDER BY c.created_at DESC`,
        [articleId]
    );
    res.json(result.rows);
};

export const addComment = async (req: AuthRequest, res: Response) => {
    const { articleId } = req.params;
    const { content } = req.body;
    const result = await pool.query(
        `INSERT INTO comments (user_id, article_id, content) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
        [req.userId, articleId, content]
    );
    res.status(201).json(result.rows[0]);
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await pool.query(
        `DELETE FROM comments WHERE id = $1 AND user_id = $2`,
        [id, req.userId]
    );
    res.json({ success: true });
};