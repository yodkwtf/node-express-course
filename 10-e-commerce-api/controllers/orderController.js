const Order = require('../models/Order');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

// # FAKE STRIPE FUNCTION
const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue';
  return { client_secret, amount };
};

// * GET ALL ORDERS
const getAllOrders = async (req, res) => {
  // get all orders [admin permission in orderRoutes.js already]
  const orders = await Order.find({});

  // send back the response
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

// * GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
  // get single order id
  const { id: orderId } = req.params;

  // get single order from DB
  const order = await Order.findOne({ _id: orderId });

  // check if order exists
  if (!order) {
    throw new CustomError.NotFoundError(`No order found with id : ${orderId}`);
  }

  // check if user is only requesting his own order[utils]
  checkPermissions(req.user, order.user);

  // send back the single order
  res.status(StatusCodes.OK).json({ order });
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

  // calculate the whole total
  const total = subtotal + tax + shippingFee;

  // comm with stripe to get clientSecret
  const paymentIntent = await fakeStripeAPI({ amount: total, currency: 'usd' });

  // FINALLY!!! create the order
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  // send back the response
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
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
