const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
      // we are passing the error to the next middleware which in our case is errorHandlerMiddleware
    }
  };
};

module.exports = asyncWrapper;
