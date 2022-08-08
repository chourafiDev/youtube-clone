import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";

//Generate jwt
const generateJwt = (id) => {
  //Create new token
  return jwt.sign({ id }, process.env.JWT);
};

//Create send token with cookie
const createSendToken = (user, statusCode, res) => {
  const token = generateJwt(user._id);

  const cookieOptions = {
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("access_token", token, cookieOptions);

  user.password = undefined;

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    subscribedUsers: user.subscribedUsers,
    img: user.img,
    token,
  };

  res.status(statusCode).json({
    userData,
  });
};

//Regsiter user
const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, imgUrl } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please add all fileds", 400));
  }

  //Check if user exists
  const user = await User.findOne({ name });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  //hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = hash;
  if (imgUrl) {
    const result = await cloudinary.uploader.upload(imgUrl, {
      folder: "youtube/photo",
      width: "150",
      crop: "scale",
    });

    newUser.img = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await newUser.save();

  createSendToken(newUser, 201, res);
});

//Login
const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please add all fileds", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ErrorHandler("Email or password invalide", 401));
  }

  createSendToken(user, 201, res);
});

export { register, login };
