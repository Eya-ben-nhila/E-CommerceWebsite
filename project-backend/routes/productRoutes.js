const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/', productController.createProduct); // Add this line
router.get('/:id', productController.getAllProducts);

module.exports = router;