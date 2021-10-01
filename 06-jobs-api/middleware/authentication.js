const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // get header
  const authHeader = req.headers.authorization;

  // check if it exists and format is correct
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  // extract token from bearer token
  const token = authHeader.split(' ')[1];

  try {
    // verify & get the token specific data sent with jwt.sign
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job routes

    // setup properties for req.user
    req.user = { userId: payload.userId, name: payload.name };

    // pass user to job routes
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
