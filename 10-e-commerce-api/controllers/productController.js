const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

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

  // delete product from DB [will make sense after reviews]
  await product.remove();

  // send response
  res.status(StatusCodes.OK).json({ msg: 'Success! Product was removed.' });
};

// * UPLOAD PRODUCT Image
const uploadImage = async (req, res) => {
  // check if we have the uploaded file
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }

  // get the uploaded file
  const productImage = req.files.image;

  // if file uploaded isnt image [mimetype - log req.files]
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload image');
  }

  // check for image size
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  // move image to local uploads directory
  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  );
  await productImage.mv(imagePath);

  // send the response
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
