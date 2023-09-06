const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add an item to the cart
router.post('/add', cartController.addToCart);

// Get products in the user's cart
router.get('/:userId', cartController.getCartProducts);


// Delete a product from the user's cart
router.delete('/:userId/:productId', cartController.deleteCartProduct);


// Update the quantity of a product in the user's cart
router.put('/:userId/:productId', cartController.updateCartProduct);

module.exports = router;