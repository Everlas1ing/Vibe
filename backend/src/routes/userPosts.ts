import { Router } from 'express';
import { getUserPosts, createPost, deletePost, getPostById, updatePost } from '../controllers/userPostsController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/user/:userId', getUserPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;