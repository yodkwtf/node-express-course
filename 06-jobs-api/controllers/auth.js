const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

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
  // get the user details
  const { email, password } = req.body;

  // validate if details are provided
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password...');
  }

  // find the user by from DB
  const user = await User.findOne({ email });

  // compare password

  // if user doesn't exist
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // otherwise, create the token [instance method]
  const token = user.createJWT();

  // send the response and data to be handled at frontend
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
