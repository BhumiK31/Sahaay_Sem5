const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuthorization = require('../middleware/roleAuthorization');
const jobController = require('../controllers/jobController');

router.use(authMiddleware);

// --- Caregiver-specific routes FIRST ---
router.get('/caregiver/dashboard', roleAuthorization(['caregiver', 'student']), jobController.getCaregiverDashboard);
router.get('/caregiver/find-jobs', roleAuthorization(['caregiver', 'student']), jobController.getJobsForCaregivers);
router.get('/caregiver/job-details/:id', roleAuthorization(['caregiver', 'student']), jobController.getJobDetailsForCaregiver);
router.post('/caregiver/apply/:id', roleAuthorization(['caregiver', 'student']), jobController.applyForJob);
router.get('/caregiver/applications', roleAuthorization(['caregiver', 'student']), jobController.getMyApplications);
router.patch('/caregiver/availability', roleAuthorization(['caregiver', 'student']), jobController.updateAvailability);

// --- REST of your routes ---
router.post('/', roleAuthorization(['family', 'admin']), jobController.createJob);
router.get('/', jobController.getAllJobs);
// KEEP THESE LAST
router.get('/:id', jobController.getJobById);
router.put('/:id', roleAuthorization(['family', 'admin']), jobController.updateJob);
router.delete('/:id', roleAuthorization(['admin']), jobController.deleteJob);


module.exports = router;
