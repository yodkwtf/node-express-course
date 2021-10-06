const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
} = require('../controllers/productController');
const uploadProductImage = require('../controllers/uploadsController');

// # CREATE PRODUCT
router.post('/', createProduct);

// # GET ALL PRODUCTS
router.get('/', getAllProducts);

// # UPLAOD PRODUCT IMAGE
router.post('/uploads', uploadProductImage);

module.exports = router;
