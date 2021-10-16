const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassowrd,
} = require('../controllers/userController');

//# GET ALL USERS
router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers);

// # SHOW CURRENT USER
router.route('/showMe').get(authenticateUser, showCurrentUser);

// # UPDATE USER
router.route('/updateUser').patch(authenticateUser, updateUser);

// # UPDATE USER PASSWORD
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassowrd);

// # GET SINGLE USER
router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
