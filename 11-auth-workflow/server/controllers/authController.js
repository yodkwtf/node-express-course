const User = require('../models/User');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
} = require('../utils');
const crypto = require('crypto');

// # REGISTER USER
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

  // origin
  const origin = `http://localhost:3000`;

  // send a verification email
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  // send verificationToken only for testing in postman
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
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

  // get the verified user
  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = '';

  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    // destructure
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    return res.status(StatusCodes.OK).json({ user: tokenUser });
  }

  // create refresh tokne
  refreshToken = crypto.randomBytes(40).toString('hex');

  // add Token Model properties (getting from req headers)
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  // create a token using token model
  await Token.create(userToken);

  // attach both cookies
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  // send back the response
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// # LOGOUT USER
const logout = async (req, res) => {
  // remove the token from data
  await Token.findOneAndDelete({ user: req.user.userId });

  // remove both the cookies
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  // send back response
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

// # VERIFY EMAIL
const verifyEmail = async (req, res) => {
  // get data from body
  const { verificationToken, email } = req.body;

  // find the user to verify
  const user = await User.findOne({ email });

  // if user not found
  if (!user) {
    throw new CustomError.UnauthenticatedError('Verification failed');
  }

  // if the token isnt correct
  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError('Verification failed');
  }

  // if token macthes, verify the user
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';

  // save the user
  await user.save();

  // send back the response
  res.status(StatusCodes.OK).send({ msg: 'Email verified!' });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
