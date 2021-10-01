const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

// # REGISTER
const register = async (req, res) => {
  // create user
  const user = await User.create({ ...req.body });

  // create a jwt token
  const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
    expiresIn: '30d',
  });

  // send token and user name as response [we can also decode name and other things in frontend at times]
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// # LOGIN
const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
