const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors');

// # LOGIN OR REGISTER
const login = async (req, res) => {
  // get data
  const { username, password } = req.body;

  // check if data isnt there
  if (!username || !password) {
    throw new BadRequest('Please provide email and password');
  }

  // dummy id for demo,normally provided by DB!!
  const id = new Date().getTime();

  // create a new token `jwt.sign(payload, jwt secret, options)`
  // ! keep payload as small as you can, better user experience
  // ! jwt secret should be long, unguessable string in production [here its for demo]
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // send response
  res.status(200).json({ msg: 'user created', token });
};

// # DASHBOARD TO GET THE DATA
const dashboard = async (req, res) => {
  // get the aithenticated user from req
  // console.log(req.user);

  // generate a random number
  const luckyNumber = Math.floor(Math.random() * 100) + 1;

  // send the response
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
