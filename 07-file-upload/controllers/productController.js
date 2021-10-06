const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

// # CREATE PRODUCT (POST)
const createProduct = async (req, res) => {
  // create product
  const product = await Product.create(req.body);

  // send product as response
  res.status(StatusCodes.CREATED).json({ product });
};

// # GET ALL PRODUCTS (GET)
const getAllProducts = async (req, res) => {
  res.send('all the products');
};

module.exports = {
  createProduct,
  getAllProducts,
};
