import express from 'express';
import { updateProgress, getProgress, getAllProgress } from '../controllers/progress.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getAllProgress);
router.get('/:topicId', getProgress);
router.put('/:topicId', updateProgress);

export default router;
