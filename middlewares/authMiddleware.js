import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";

export const isAuthontecated = catchAsyncErrors(async (req, res, next) => {
  //Get token from cookies
  // const token = req.cookies.access_token;

  //Get token from headers
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ErrorHandler(
        "You are not logged in! Please log in to get access",
        401
      )
    );
  }

  //Verify token
  const decode = await promisify(jwt.verify)(token, process.env.JWT);

  //Get current user
  const user = await User.findById(decode.id);

  if (!user) {
    return next(
      new ErrorHandler(
        "The user belonging to this token does no longer exists",
        401
      )
    );
  }

  req.user = user;

  next();
});
