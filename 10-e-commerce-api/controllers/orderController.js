const Order = require('../models/Order');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

// * GET ALL ORDERS
const getAllOrders = async (req, res) => {
  res.send('get all orders');
};

// * GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
  res.send('get single order');
};

// * GET CURRENT USER"S ORDERS
const getCurrentUserOrders = async (req, res) => {
  res.send('get current users orders');
};

// * CREATE ORDER
const createOrder = async (req, res) => {
  // get order data
  const { items: cartItems, tax, shippingFee } = req.body;

  // check cart isnt empty
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No items in cart');
  }

  // check if tax and shipping fee are given
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }

  // send back the response
  res.status(StatusCodes.CREATED).send('create order');
};

// * UPDATE ORDER
const updateOrder = async (req, res) => {
  res.send('update order');
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
