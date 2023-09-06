const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes')
const Product = require('./models/Product');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://ranjan91700:navyaecommerce@cluster0.e1pxesm.mongodb.net/Navya?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

//products
app.use('/api', productRoutes);


//cart
app.use('/cart', cartRoutes);

//order

app.use('/orders', orderRoutes);


//// search
// Define a route for product search
app.get('/products/search', async (req, res) => {
  const { query } = req.query;

  try {
    // Use a regular expression for case-insensitive search
    const regex = new RegExp(query, 'i');

    // Search for products with matching titles or descriptions
    const products = await Product.find({
      $or: [{ title: regex }, { description: regex }],
    });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//// search







// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
