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
  // # GET SINGLE PRODUCT
  .get(getSingleProduct)
  // # UPDATE PRODUCT
  .patch(
    authenticateUser,
    authorizePermissions('admin', 'owner'),
    updateProduct
  )
  // # DELETE PRODUCT
  .delete(
    authenticateUser,
    authorizePermissions('admin', 'owner'),
    deleteProduct
  );

module.exports = router;
