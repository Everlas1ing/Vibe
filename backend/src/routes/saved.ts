import { Router } from 'express';
import { getSaved, toggleSave } from '../controllers/savedController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getSaved);
router.post('/:articleId', authMiddleware, toggleSave);

export default router;