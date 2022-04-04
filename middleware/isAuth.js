import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import {
  handleSuccess,
  handleError,
  unauthorized,
} from '../helpers/responseHandler.js';

//Routes Protect handler
const protect = catchAsync(async (req, res, next) => {
  let token;

  // Getting token & check if its there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(
          handleError({
            res,
            data: err,
          })
        );
      }
      req.user = user;
    });
  } else {
    return next(
      handleError({
        res,
        data: 'You are not loggedIn. Please login to get access',
      })
    );
  }

  next();
});

export default protect;
