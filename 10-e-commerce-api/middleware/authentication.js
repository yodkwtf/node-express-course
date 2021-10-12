const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

// * AUTHENTICATE USER [If they exist]
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

// * AUTHORIZE PERMISSIONS
const authorizePermissions = (...roles) => {
  // return another func so first one acts as a callback
  return (req, res, next) => {
    // if roles array ['owner','admin'] doesnt include the role of user who made the req
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }

    // pass it to next middleware
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
