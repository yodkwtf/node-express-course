const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const crypto = require('crypto');

// # REGISTER
const register = async (req, res) => {
  // get user data
  const { email, name, password } = req.body;

  // check if user exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  // create a random token
  const verificationToken = crypto.randomBytes(40).toString('hex');

  // create the user
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  // send back an email to verify
  // send verificationToken only for testing in postman
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
    verificationToken: user.verificationToken,
  });
};

// # LOGIN USER
const login = async (req, res) => {
  // get user data
  const { email, password } = req.body;

  // check if data isnt provided
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  // find the logged user
  const user = await User.findOne({ email });

  // if user isnt found
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // compare passowrd and check if it isnt correct
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // check if user is verified
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError('Please verify your email');
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// # LOGOUT USER
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
