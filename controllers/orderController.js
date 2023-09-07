const Order = require('../models/Order');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const { userId, items, email, mobile, shippingAddress,paymentMethod,totalamount } = req.body;

    // Create a new order
    const order = new Order({ userId, items ,email,mobile,shippingAddress,paymentMethod,totalamount});

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Cancel an order by ID
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order is already canceled
    if (order.status === 'canceled') {
      return res.status(400).json({ message: 'Order is already canceled' });
    }

    // Update the order status to 'canceled'
    order.status = 'canceled';

    // Save the updated order to the database
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

