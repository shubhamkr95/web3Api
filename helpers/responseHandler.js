// global error handler
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

//success handler
const handleSuccess = ({
  res,
  statusCode = 200,
  msg = 'Success',
  data = {},
  result = 1,
}) => {
  res.status(statusCode).json({ result, msg, data });
};

// error handler
const handleError = ({
  res,
  statusCode = 500,
  err_msg = 'Error',
  err = 'error',
  data = {},
  result = 0,
}) => {
  res.status(statusCode).json({
    result,
    err_msg,
    msg: err instanceof Error ? err.message : err_msg,
    data,
  });
};

// handle unauthorized route
const unauthorized = (res) => {
  res.status(401).json({
    msg: `you are not authorized to this page`,
  });
};

export { handleSuccess, handleError, unauthorized, AppError };
