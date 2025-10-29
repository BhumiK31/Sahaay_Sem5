const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');
const User = require('../models/User'); // ✅ FIXED
router.get('/test-alive', (req, res) => res.json({ success: true }));

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/verify-email', userController.verifyEmail);
router.post('/resend-verification', userController.resendVerification);

// Protected routes (require authentication)
router.get('/:id', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.put('/update/:id', userController.updateUserProfile);

// ✅ Apply both: auth first, then upload
router.post(
  '/profile-photo',
  authMiddleware,
  userController.upload.single('profilePhoto'),
  userController.uploadProfilePhoto
);

router.post(
  '/id-proof',
  authMiddleware,
  userController.upload.single('idProof'),
  userController.uploadGovtIdProof
);

// Add to routes/users.js

module.exports = router;
