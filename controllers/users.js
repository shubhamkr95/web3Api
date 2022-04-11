import Users from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import { handleSuccess } from '../helpers/responseHandler.js';

// Get current users
const user = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  // check weather user is admin or not
  if (user.role === 'admin') {
    const allUsers = await Users.find();
    handleSuccess({
      res,
      msg: `Welcome admin`,
      data: allUsers,
    });
  } else {
    const currUser = user;
    handleSuccess({
      res,
      msg: `Welcome user`,
      data: currUser,
    });
  }
});

export default user;
