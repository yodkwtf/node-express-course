const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const brcypt = require('bcryptjs');

// # REGISTER
const register = async (req, res) => {
  // get user data
  const { name, email, password } = req.body;

  // no. of random bytes
  const salt = await brcypt.genSalt(10);
  // hash password
  const hashedPassword = await brcypt.hash(password, salt);

  // create a temp user with hashed password
  const tempUser = { name, email, password: hashedPassword };

  // create user
  const user = await User.create({ ...tempUser });
  console.log(user);
  res.status(StatusCodes.CREATED).json({ user });
};

// # LOGIN
const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
