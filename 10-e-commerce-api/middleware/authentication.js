const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  // get token, if present
  const token = req.signedCookies.token;

  // if token isnt present
  if (!token) {
    console.log('error, no token present');
  } else {
    console.log('token present');
  }

  next();
};

module.exports = authenticateUser;
