const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file.path;

    const product = new Product({ title, description, image, price });
    await product.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Retrieve one product by ID
exports.getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const product = await Product.findById(productId).exec();
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  // Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const product = await Product.findByIdAndRemove(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




  /// update products

  exports.updateProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      const { title, description, price } = req.body;
  
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { title, description, price },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };










