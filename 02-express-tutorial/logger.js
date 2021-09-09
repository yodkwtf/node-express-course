const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();

  console.log(method, url, time);

  // we much past it on to the next middleware unless we send the response directly in middleware ourself
  next();
};

module.exports = logger;
