const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router
  .route('/')
  // # CREATE REVIEW
  .post(authenticateUser, createReview)
  // # GET ALL REVIEWS
  .get(getAllReviews);

router
  .route('/:id')
  // # GET SINGLE REVIEW
  .get(getSingleReview)
  // # UPDATE REVIEW
  .patch(authenticateUser, updateReview)
  // # DELETE REVIEW
  .delete(authenticateUser, deleteReview);

module.exports = router;
