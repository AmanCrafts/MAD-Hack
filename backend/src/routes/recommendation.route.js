import express from 'express';
import { getNextTopic } from '../controllers/recommendation.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate); // Protect all recommendation routes

router.get('/next-topic', getNextTopic);

export default router;
