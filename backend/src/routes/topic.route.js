import express from 'express';
import * as TopicController from '../controllers/topic.controller.js';

const router = express.Router();

// Routes for topics
router.get('/', TopicController.getTopics);
router.post('/', TopicController.createTopic);
router.get('/:id', TopicController.getTopicById);
router.put('/:id', TopicController.updateTopic);
router.delete('/:id', TopicController.deleteTopic);

export default router;
