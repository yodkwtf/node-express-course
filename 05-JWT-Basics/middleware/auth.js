const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req, res, next) => {
  // get auth header
  const authHeader = req.headers.authorization;

  // validate auth header syntax
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('Unauthorized', 401);
  }

  // get the token form auth header
  const token = authHeader.split(' ')[1];

  // verify if the token is correct
  try {
    //- get the token specific data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;

    //- set up a property on req object
    req.user = { id, username };

    //- pass it to next middleware
    next();
  } catch (error) {
    //- throw an error if it isn't correct
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
};

module.exports = authenticationMiddleware;
