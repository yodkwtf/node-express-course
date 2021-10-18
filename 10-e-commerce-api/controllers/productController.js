const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// * CREATE PRODUCT
const createProduct = async (req, res) => {
  // attach user id as a `user` key on product[name should macth model]
  req.body.user = req.user.userId;

  // create product
  const product = await Product.create(req.body);

  // send response and product
  res.status(StatusCodes.CREATED).json({ product });
};

// * GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  res.send('get all products');
};

// * GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  res.send('get single product');
};

// * UPDATE PRODUCT
const updateProduct = async (req, res) => {
  res.send('update product');
};

// * DELETE PRODUCT
const deleteProduct = async (req, res) => {
  res.send('delete product');
};

// * UPLOAD PRODUCT Image
const uploadImage = async (req, res) => {
  res.send('upload image');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
