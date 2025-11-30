const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuthorization = require('../middleware/roleAuthorization');
const applicationController = require('../controllers/applicationController');

router.use(authMiddleware);

router.post('/', roleAuthorization(['family', 'care_provider']), applicationController.createApplication);
router.get('/', roleAuthorization(['family', 'care_provider']), applicationController.getApplications);
router.get('/:id', roleAuthorization(['family', 'care_provider']), applicationController.getApplicationById);
router.put('/:id', roleAuthorization(['family', 'care_provider']), applicationController.updateApplication);
router.delete('/:id', roleAuthorization(['admin']), applicationController.deleteApplication);

module.exports = router;
