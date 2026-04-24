import { Router } from 'express';
import { getComments, addComment, deleteComment } from '../controllers/commentsController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/:articleId', getComments);
router.post('/:articleId', authMiddleware, addComment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;