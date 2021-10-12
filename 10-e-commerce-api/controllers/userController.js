const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

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
  res.send('show current user');
};

//* UPDATE USER
const updateUser = async (req, res) => {
  res.send(req.body);
};

//* UPDATE USER PASSWORD
const updateUserPassowrd = async (req, res) => {
  res.send('update user password');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassowrd,
};
