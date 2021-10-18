const Review = require('../models/Review');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// * CREATE REVIEW
const createReview = async (req, res) => {
  res.send('create Review');
};

// * GET ALL REVIEWS
const getAllReviews = async (req, res) => {
  res.send('get all reviews');
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
