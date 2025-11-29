import express from 'express';
import {
    signup,
    signin,
    signout,
    getProfile,
    updateProfile,
    refreshToken
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/refresh', refreshToken);

// Protected routes (require authentication)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;
