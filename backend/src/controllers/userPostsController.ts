import { Response } from 'express';
import { pool } from '../models/db';
import { AuthRequest } from '../middleware/auth';

export const getUserPosts = async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;
    const result = await pool.query(
        `SELECT up.*, u.username, u.avatar
         FROM user_posts up
                  JOIN users u ON up.user_id = u.id
         WHERE up.user_id = $1
         ORDER BY up.created_at DESC`,
        [userId]
    );
    res.json(result.rows);
};

export const getPostById = async (req: AuthRequest, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT up.*, u.username, u.avatar 
       FROM user_posts up 
       JOIN users u ON up.user_id = u.id 
       WHERE up.id = $1`,
            [req.params.id]
        );
        if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createPost = async (req: AuthRequest, res: Response) => {
    const { title, description, image, tags } = req.body;
    const result = await pool.query(
        `INSERT INTO user_posts (user_id, title, description, image, tags) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [req.userId, title, description, image, tags]
    );
    res.status(201).json(result.rows[0]);
};

export const updatePost = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, image, tags } = req.body;
    try {
        const check = await pool.query(
            `SELECT user_id FROM user_posts WHERE id = $1`, [id]
        );
        if (!check.rows[0]) return res.status(404).json({ error: 'Not found' });
        if (check.rows[0].user_id !== req.userId) return res.status(403).json({ error: 'Forbidden' });

        const result = await pool.query(
            `UPDATE user_posts SET title=$1, description=$2, image=$3, tags=$4
       WHERE id=$5 AND user_id=$6 RETURNING *`,
            [title, description, image, tags, id, req.userId]
        );
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await pool.query(`DELETE FROM user_posts WHERE id = $1 AND user_id = $2`, [id, req.userId]);
    res.json({ success: true });
};