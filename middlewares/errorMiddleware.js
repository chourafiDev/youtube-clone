import ErrorHandler from "../utils/errorHandler.js";

const onError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;

  //Wrong Mongoose Object ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalide: ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  //Handling Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  //Handling Duplicate field value
  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
    console.log(value);
    const message = `Duplicate field ${value[0]}`;
    error = new ErrorHandler(message, 400);
  }

  //Handle JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid tokent, Please log in again!`;
    error = new ErrorHandler(message, 400);
  }

  //Handle JWT expired
  if (err.name === "TokenExpiredError") {
    const message = `Token has expired, Please log in again!`;
    error = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};

export default onError;
