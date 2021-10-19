const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');

const { getSingleProductReviews } = require('../controllers/reviewController');

router
  .route('/')
  // # CREATE PRODUCT
  .post(authenticateUser, authorizePermissions('admin', 'owner'), createProduct)
  // # GET ALL PRODUCTS
  .get(getAllProducts);

//# UPLOAD PRODUCT IMAGE
router
  .route('/uploadImage')
  .post(
    [authenticateUser, authorizePermissions('admin', 'owner')],
    uploadImage
  );

router
  .route('/:id')
  .get(getSingleProduct) // # GET SINGLE PRODUCT
  .patch(
    authenticateUser,
    authorizePermissions('admin', 'owner'), // # UPDATE PRODUCT
    updateProduct
  )
  .delete(
    authenticateUser,
    authorizePermissions('admin', 'owner'), // # DELETE PRODUCT
    deleteProduct
  );

// # GET SINGLE PRODUCT REVIEWS
router.route('/:id/reviews').get(getSingleProductReviews);

module.exports = router;
