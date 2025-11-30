const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const roleAuthorization = require('../middleware/roleAuthorization');
const reviewController = require('../controllers/reviewController');

router.use(authMiddleware);

router.post('/', roleAuthorization(['family', 'care_provider', 'admin']), reviewController.createReview);
router.get('/', reviewController.getReviews);

module.exports = router;
