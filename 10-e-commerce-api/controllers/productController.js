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
  // get all products
  const products = await Product.find({});

  // send back the response
  res.status(StatusCodes.OK).json({ count: products.length, products });
};

// * GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  // get product id
  const { id: productId } = req.params;

  // get single product
  const product = await Product.findOne({ _id: productId });

  // if no product found
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id : ${productId}`
    );
  }

  // send back the response
  res.status(StatusCodes.OK).json({ product });
};

// * UPDATE PRODUCT
const updateProduct = async (req, res) => {
  // get product id
  const { id: productId } = req.params;

  // find product and update
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  // if no product found
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id : ${productId}`
    );
  }

  // send back the response
  res.status(StatusCodes.OK).json({ product });
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
