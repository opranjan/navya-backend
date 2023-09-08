const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place a new order
router.post('/place', orderController.placeOrder);

// Get all orders
router.get('/allorder', orderController.getAllOrders);

// Get all orders by a particular user
router.get('/allorder/:userId', orderController.getOrdersByUser);

// Cancel an order by ID
router.put('/cancel/:orderId', orderController.cancelOrder);

module.exports = router;
