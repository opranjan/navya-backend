const Cart = require('../models/Cart');

// Add an item to the user's cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user's cart exists or create a new one
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) => item.productId.equals(productId));

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: 'Item added to the cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Delete a product from the user's cart
exports.deleteCartProduct = async (req, res) => {
    try {
      const { userId, productId } = req.params;
  
      // Find the user's cart
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the index of the product to remove in the cart
      const productIndex = cart.items.findIndex((item) => item.productId == productId);
  
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Remove the product from the cart
      cart.items.splice(productIndex, 1);
  
      await cart.save();
  
      res.status(200).json({ message: 'Product removed from the cart', cart });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };





// Get products in the user's cart

exports.getCartProducts = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user's cart
      const cart = await Cart.findOne({ userId }).populate('items.productId');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Extract the products from the cart
      const products = cart.items.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      }));
  
      res.status(200).json({ cart: products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




// Update the quantity of a product in the user's cart
exports.updateCartProduct = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const cartItem = cart.items.find((item) => item.productId == productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    cartItem.quantity = quantity;

    await cart.save();

    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

