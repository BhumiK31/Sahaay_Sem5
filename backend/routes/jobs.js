const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuthorization = require('../middleware/roleAuthorization');
const jobController = require('../controllers/jobController');

router.use(authMiddleware);

router.post('/', roleAuthorization(['family', 'admin']), jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.put('/:id', roleAuthorization(['family', 'admin']), jobController.updateJob);
router.delete('/:id', roleAuthorization(['admin']), jobController.deleteJob);

module.exports = router;
