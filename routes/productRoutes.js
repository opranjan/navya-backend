const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');
const path = require('path'); // Import the 'path' module

// Middleware for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create a new product
router.post('/create', upload.single('image'), productController.createProduct);

// Retrieve all products
router.get('/products', productController.getAllProducts);

// Retrieve one product by ID
router.get('/products/:productId', productController.getProductById);


// Delete a product by ID
router.delete('/products/:productId', productController.deleteProductById);


// Update a product by ID
router.put('/products/:productId', productController.updateProductById);

module.exports = router;
