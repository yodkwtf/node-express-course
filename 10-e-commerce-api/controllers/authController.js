const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// # REGISTER
const register = async (req, res) => {
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
