const authorize = (req, res, next) => {
  // check for query string
  const { user } = req.query;

  // if user exists
  if (user) {
    req.user = { name: user, id: 1 };
    next();
  }
  // if user does not exist
  else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = authorize;
