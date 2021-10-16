const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);

  // if admin is requesting, continue
  if (requestUser.role === 'admin') return;

  // if logged user whos requesting is providing his own id in getSingleUser, continue
  if (requestUser.userId === resourceUserId.toString()) return;

  // if not then throw error
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = checkPermissions;
