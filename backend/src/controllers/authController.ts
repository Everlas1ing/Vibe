import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../models/db';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO users (username, email, password_hash) 
       VALUES ($1, $2, $3) RETURNING id, username, email, avatar`,
            [username, email, hash]
        );
        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        res.status(201).json({ user, token });
    } catch (err: any) {
        if (err.code === '23505') return res.status(400).json({ error: 'Email або username вже зайнятий' });
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user = result.rows[0];
        if (!user) return res.status(400).json({ error: 'Невірний email або пароль' });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(400).json({ error: 'Невірний email або пароль' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        const { password_hash, ...safeUser } = user;
        res.json({ user: safeUser, token });
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMe = async (req: any, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, username, email, avatar, bio, created_at FROM users WHERE id = $1`,
            [req.userId]
        );
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};