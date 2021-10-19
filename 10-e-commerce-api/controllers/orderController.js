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

  // data
  let orderItems = [];
  let subtotal = 0;

  // looping over async func
  for (const item of cartItems) {
    // get single product from cart
    const dbProduct = await Product.findOne({ _id: item.product });

    // check if product exists
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product found with id : ${item.product}`
      );
    }

    // get product data
    const { name, price, image, _id } = dbProduct;

    // create a new SingleOrderItem [extra schema from Order.js]
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    // add single item to order [orderItems]
    orderItems = [...orderItems, singleOrderItem];

    // calc subtotal after each itme of cart
    subtotal += item.amount * price;
  }

  // send back the response
  res.status(StatusCodes.CREATED).json({ orderItems, subtotal });
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
