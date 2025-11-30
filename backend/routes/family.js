const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuthorization = require('../middleware/roleAuthorization');
const familyController = require('../controllers/familyController');

// All routes require authentication & family role
router.use(authMiddleware);
router.use(roleAuthorization(['family']));

// Dashboard
router.get('/dashboard', familyController.getFamilyDashboard);

// Profile
router.get('/me', familyController.getFamilyProfile);
router.put('/me', familyController.updateFamilyProfile);

// Job Management
router.post('/jobs', familyController.postJob);
router.get('/jobs', familyController.getMyPostedJobs);
router.get('/jobs/:jobId', familyController.getJobDetails);
router.put('/jobs/:jobId', familyController.updateJob);
router.delete('/jobs/:jobId', familyController.deleteJob);

// Application Management
router.get('/jobs/:jobId/applications', familyController.getJobApplications);
router.patch('/applications/:applicationId/status', familyController.updateApplicationStatus);

// Caregiver Search & View
router.get('/caregivers/search', familyController.searchCaregivers);
router.get('/caregivers/:caregiverId', familyController.getCaregiverProfile);

module.exports = router;
