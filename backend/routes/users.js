const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

// Public routes without auth
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/verify-email', userController.verifyEmail);  // New route
router.post('/resend-verification', userController.resendVerification);


// Protected routes
router.use(authMiddleware);
router.get('/:id', userController.getUserProfile);

module.exports = router;
