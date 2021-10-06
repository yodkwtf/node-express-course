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
  // get all products
  const products = await Product.find({});

  // send all the products as a response
  res.status(StatusCodes.OK).json({ products });
};

module.exports = {
  createProduct,
  getAllProducts,
};
