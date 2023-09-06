const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the file path or URL to the image
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Product', productSchema);
