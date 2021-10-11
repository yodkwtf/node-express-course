const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createJWT } = require('../utils');

// # REGISTER USER
const register = async (req, res) => {
  // get the email
  const { name, password, email } = req.body;

  // find a user by email entered
  const emailAlreadyExists = await User.findOne({ email });

  // if user found, throw duplicate register error
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // set up first account as admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  // create a user with specific properties
  const user = await User.create({ name, email, password, role });

  // create a token user to send token specific properties
  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  // cretae a JWT token
  const token = createJWT({ payload: tokenUser });

  // send the cookie [built in express]
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 1s * 60s * 60min * 24hrs * 2days
  });

  // send back the user as a response
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
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
