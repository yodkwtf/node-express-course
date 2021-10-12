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
const authorizePermissions = (req, res, next) => {
  // check if role isnt admin
  if (req.user.role !== 'admin') {
    throw new CustomError.UnauthorizedError(
      'Unauthorized to access this route'
    );
  }

  // pass it to next middleware
  next();
};

module.exports = { authenticateUser, authorizePermissions };
