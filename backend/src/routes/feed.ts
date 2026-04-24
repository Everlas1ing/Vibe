import { Router } from 'express';
import { pool } from '../models/db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const articles = await pool.query(`
            SELECT
                a.id,
                a.title,
                a.slug,
                a.excerpt,
                a.cover_image,
                a.author AS author_name,
                a.published_at AS created_at,
                c.name AS category,
                'article' AS type,
                NULL::text[] AS tags
            FROM articles a
                     LEFT JOIN categories c ON a.category_id = c.id
            ORDER BY a.published_at DESC
                LIMIT 10
        `);

        const collections = await pool.query(`
            SELECT
                id,
                title,
                slug,
                description AS excerpt,
                cover_image,
                brand AS author_name,
                created_at,
                season AS category,
                'collection' AS type,
                NULL::text[] AS tags
            FROM collections
            ORDER BY created_at DESC
                LIMIT 6
        `);

        const trends = await pool.query(`
            SELECT
                id,
                title,
                slug,
                description AS excerpt,
                cover_image,
                NULL AS author_name,
                created_at,
                NULL AS category,
                'trend' AS type,
                tags
            FROM trends
            ORDER BY created_at DESC
                LIMIT 6
        `);

        const posts = await pool.query(`
            SELECT
                up.id,
                up.title,
                NULL AS slug,
                up.description AS excerpt,
                up.image AS cover_image,
                u.username AS author_name,
                up.created_at,
                NULL AS category,
                'post' AS type,
                up.tags
            FROM user_posts up
                     JOIN users u ON up.user_id = u.id
            ORDER BY up.created_at DESC
                LIMIT 8
        `);

        const feed = [
            ...articles.rows,
            ...collections.rows,
            ...trends.rows,
            ...posts.rows,
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        res.json(feed);
    } catch (err) {
        console.error('Feed error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;