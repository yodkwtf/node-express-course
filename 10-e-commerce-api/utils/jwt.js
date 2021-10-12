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

//# create cookeis from token
const attachCookiesToResponse = ({ res, user }) => {
  // get created token
  const token = createJWT({ payload: user });

  // create a cookie from token and send cookies
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 1s * 60s * 60min * 24hrs * 2days
    secure: process.env.NODE_ENV === 'production', // http for dev & https for prod
    signed: true, // sign the cookies
  });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
