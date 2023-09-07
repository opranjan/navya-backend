const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [orderItemSchema],
  // Add any additional fields you need for the order, such as shipping information, total price, etc.
  email: String, // User's email
  mobile: String, // User's mobile number
  shippingAddress: String, // Shipping address
  paymentMethod: String, // Payment method (e.g., credit card, PayPal)
  totalamount:Number
});

module.exports = mongoose.model('Order', orderSchema);
