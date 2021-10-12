const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  // get token, if present
  const token = req.signedCookies.token;

  // if token isnt present
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  try {
    // get the payload [tokenUser]
    const { name, role, userId } = isTokenValid({ token });

    // add the user to req object
    req.user = { name, role, userId };

    // pass it to next middleware
    next();
  } catch (error) {
    // if error
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

module.exports = authenticateUser;
