import express from 'express';
import { signup, register, login, getMe } from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';  // ⭐ NEW IMPORT

const router = express.Router();

// Public routes
router.post('/signup', upload.single('profilePicture'), signup); // ⭐ NEW ROUTE
router.post('/login', login);

// Protected routes
router.post('/register', protect, admin, register);
router.get('/me', protect, getMe);

export default router;