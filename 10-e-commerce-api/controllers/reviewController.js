const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

// * CREATE REVIEW
const createReview = async (req, res) => {
  // check for the product for rating
  const { product: productId } = req.body;

  // check if product exists, err if it doesnt
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw CustomError.NotFoundError(`No product with id : ${id}`);
  }

  // check if user already left a review, err if he didnt
  const reviewAlreadyExist = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (reviewAlreadyExist) {
    throw new CustomError.BadRequestError(
      'Already submitted a review for the product'
    );
  }

  // attach the user who rates
  req.body.user = req.user.userId;

  // create a review
  const review = await Review.create(req.body);

  // send review as response
  res.status(StatusCodes.CREATED).json({ review });
};

// * GET ALL REVIEWS
const getAllReviews = async (req, res) => {
  // get all reviews
  const reviews = Review.find({});

  // send back the response
  res.status(StatusCodes.CREATED).json({ reviews, count: reviews.count });
};

// * GET SINGLE REVIEW
const getSingleReview = async (req, res) => {
  res.send('get single Review');
};

// * UPDATE REVIEW
const updateReview = async (req, res) => {
  res.send('update Review');
};

// * DELETE REVIEW
const deleteReview = async (req, res) => {
  res.send('delete Review');
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
