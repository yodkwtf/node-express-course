const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createTokenUser, attachCookiesToResponse } = require('../utils');

//* GET ALL USERS
const getAllUsers = async (req, res) => {
  // get all users where role is user
  const users = await User.find({ role: 'user' }).select('-password');

  // send the response and users
  res.status(StatusCodes.OK).json({ users });
};

//* GET SINGLE USER
const getSingleUser = async (req, res) => {
  // find user by id
  const user = await User.findOne({ _id: req.params.id }).select('-password');

  // check if user exists by the id
  if (!user) {
    throw new CustomError.NotFoundError(
      `No user found wih id : ${req.params.id}`
    );
  }

  // send the user as a response
  res.status(StatusCodes.OK).json({ user });
};

//* SHOW CURRENT USER
const showCurrentUser = async (req, res) => {
  // get user from req.user
  const user = req.user;

  // send current user as a response
  res.status(StatusCodes.OK).json({ user });
};

//* UPDATE USER
const updateUser = async (req, res) => {
  // check if user entered details
  const { email, name } = req.body;

  // throw err, if missing
  if (!email || !name) {
    throw new CustomError.BadRequestError('Please provide all details...');
  }

  // update the user
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );

  // create token user[utils]
  const tokenUser = createTokenUser(user);

  // attach cookies to the response
  attachCookiesToResponse({ res, user: tokenUser });

  // send back the response
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

//* UPDATE USER PASSWORD
const updateUserPassowrd = async (req, res) => {
  // get passwords
  const { oldPassword, newPassword } = req.body;

  // if no password given
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both the passwords');
  }

  // get the specified user
  const user = await User.findOne({ _id: req.user.userId });

  // check if password's correct
  const isPasswordCorrect = await user.comparePassword(oldPassword);

  // if password isnt correct
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // otherwise, change password
  user.password = newPassword;

  // save the new user
  await user.save();

  // send back response
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassowrd,
};
