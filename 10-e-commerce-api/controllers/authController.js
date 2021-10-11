const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// # REGISTER
const register = async (req, res) => {
  // get the email
  const { email } = req.body;

  // find a user by email entered
  const emailAlreadyExists = await User.findOne({ email });

  // if user found, throw duplicate register error
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // create a user
  const user = await User.create(req.body);

  // send back the user as a response
  res.status(StatusCodes.CREATED).json({ user });
};

// # LOGIN
const login = async (req, res) => {
  res.send('the LOGIN controller');
};

// # LOGOUT
const logout = async (req, res) => {
  res.send('the LOGOUT controller');
};

module.exports = {
  register,
  login,
  logout,
};
