const jwt = require('jsonwebtoken');

// # create a token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// # verify the token
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

//
const attachCookiesToResponse = ({ res, user }) => {
  // create token
  const token = createJWT({ payload: user });

  // send cookies
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 1s * 60s * 60min * 24hrs * 2days
  });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
