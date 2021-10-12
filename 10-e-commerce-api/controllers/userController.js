//* GET ALL USERS
const getAllUsers = async (req, res) => {
  res.send('get all users');
};

//* GET SINGLE USER
const getSingleUser = async (req, res) => {
  res.send('get single user');
};

//* SHOW CURRENT USER
const showCurrentUser = async (req, res) => {
  res.send('show current user');
};

//* UPDATE USER
const updateUser = async (req, res) => {
  res.send('update user');
};

//* UPDATE USER PASSWORD
const updateUserPassowrd = async (req, res) => {
  res.send('update user password');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassowrd,
};
