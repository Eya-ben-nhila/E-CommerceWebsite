const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router.post('/', authController.protect, orderController.createOrder);

module.exports = router;