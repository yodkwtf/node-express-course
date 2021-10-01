// # REGISTER
const register = async (req, res) => {
  res.send('register user');
};

// # LOGIN
const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
