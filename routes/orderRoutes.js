const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place a new order
router.post('/place', orderController.placeOrder);

// Cancel an order by ID
router.put('/cancel/:orderId', orderController.cancelOrder);

module.exports = router;
