const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuthorization = require('../middleware/roleAuthorization');
const messageController = require('../controllers/messageController');

router.use(authMiddleware);
router.use(roleAuthorization(['family', 'caregiver'])); // ✅ UPDATE: change 'care_provider' to 'caregiver'

router.post('/', messageController.sendMessage);
router.get('/', messageController.getMessages);

// ✅ NEW: Job chat routes
router.get('/chat/:jobId', messageController.getChatMessages);
router.post('/chat/:jobId', messageController.sendJobMessage);

module.exports = router;
