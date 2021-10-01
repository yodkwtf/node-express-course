const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

// # REGISTER
const register = async (req, res) => {
  // create user [pass hashed in schema]
  const user = await User.create({ ...req.body });

  // create a jwt token [instance method in schema]
  const token = user.createJWT();

  // send token and user name as response [we can also decode name and other things in frontend at times]
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// # LOGIN
const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
