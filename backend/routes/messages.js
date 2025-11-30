const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuthorization = require('../middleware/roleAuthorization');
const messageController = require('../controllers/messageController');

router.use(authMiddleware);
router.use(roleAuthorization(['family', 'care_provider']));

router.post('/', messageController.sendMessage);
router.get('/', messageController.getMessages);

module.exports = router;
