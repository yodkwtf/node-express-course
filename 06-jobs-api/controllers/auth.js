const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');

// # REGISTER
const register = async (req, res) => {
  // create user
  const user = await User.create({ ...req.body });

  // send response
  res.status(StatusCodes.CREATED).json({ user });
};

// # LOGIN
const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
