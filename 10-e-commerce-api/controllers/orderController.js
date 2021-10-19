const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// * GET ALL ORDERS
const getAllOrders = async (req, res) => {
  console.log('get all orders');
};

// * GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
  console.log('get single order');
};

// * GET CURRENT USER"S ORDERS
const getCurrentUserOrders = async (req, res) => {
  console.log('get current users orders');
};

// * CREATE ORDER
const createOrder = async (req, res) => {
  console.log('create order');
};

// * UPDATE ORDER
const updateOrder = async (req, res) => {
  console.log('update order');
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
