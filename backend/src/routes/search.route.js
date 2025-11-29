import express from 'express';
import { searchTopics } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/', searchTopics);

export default router;
