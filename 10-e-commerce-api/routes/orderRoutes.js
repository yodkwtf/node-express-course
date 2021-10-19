const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orderController');

// # GET ALL ORDERS || CREATE USER
router
  .route('/')
  .get([authenticateUser, authorizePermissions('admin', 'owner')], getAllOrders)
  .post(authenticateUser, createOrder);

// # GET CURRENT USER"S ORDERS
router.get('/showAllMyOrders', authenticateUser, getCurrentUserOrders);

// # GET SINGLE ORDER || UPDATE ORDER
router.route('/:id', authenticateUser).get(getSingleOrder).patch(updateOrder);

module.exports = router;
