const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

// # LOGIN OR REGISTER
const login = async (req, res) => {
  // get data
  const { username, password } = req.body;

  // check if data isnt there
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
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
  // get auth header
  const authHeader = req.headers.authorization;

  // validate auth header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('Unauthorized', 401);
  }

  // get the token form auth header
  const token = authHeader.split(' ')[1];

  // verify if the token is correct
  try {
    //- get the token specific data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //- generate a random number
    const luckyNumber = Math.floor(Math.random() * 100) + 1;

    //- send the response
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
};

module.exports = { login, dashboard };
