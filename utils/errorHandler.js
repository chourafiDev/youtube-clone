class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    //captureStackTrace gives us a stack that help us find a location of that error in the code
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
