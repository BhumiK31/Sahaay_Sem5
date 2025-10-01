const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleAuthorization = require('../middleware/roleAuthorization');
const categoryController = require('../controllers/categoryController');

router.use(authMiddleware);

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', roleAuthorization(['admin']), categoryController.createCategory);
router.put('/:id', roleAuthorization(['admin']), categoryController.updateCategory);
router.delete('/:id', roleAuthorization(['admin']), categoryController.deleteCategory);

module.exports = router;
