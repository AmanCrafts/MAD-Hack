import express from 'express';
import { addBookmark, removeBookmark, getBookmarks } from '../controllers/bookmark.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate); // Protect all bookmark routes

router.post('/', addBookmark);
router.delete('/:topicId', removeBookmark);
router.get('/', getBookmarks);

export default router;
