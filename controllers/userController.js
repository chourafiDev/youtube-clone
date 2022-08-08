import User from "../models/User.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import Video from "../models/Video.js";


const updateUser = catchAsyncErrors(async (req, res, next) => {
  const idParam = req.params.id;
  const currentUser = req.user._id;

  if (idParam.toString() === currentUser.toString()) {
    const user = await User.findByIdAndUpdate(
      idParam,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ user, message: "Your profile has been updated!" });
  } else {
    return next(
      new ErrorHandler("You have access to update only your profile")
    );
  }
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const idParam = req.params.id;
  const currentUser = req.user._id;

  if (idParam.toString() === currentUser.toString()) {
    await User.findByIdAndDelete(idParam);

    res.status(200).json({ message: "Your profile has been deleted!" });
  } else {
    return next(
      new ErrorHandler("You have access to delete only your profile")
    );
  }
});

const getUser = catchAsyncErrors(async (req, res, next) => {
  const idParam = req.params.id;

  const user = await User.findById(idParam);
  res.status(200).json(user);
});

const subscribe = catchAsyncErrors(async (req, res, next) => {
  const idParam = req.params.id;
  const currentUser = req.user._id;

  const channel = await User.findById(idParam);

  await User.findByIdAndUpdate(currentUser, {
    $push: { subscribedUsers: idParam },
  });

  await User.findByIdAndUpdate(idParam, {
    $inc: { subscribers: 1 },
  });

  res
    .status(200)
    .json({ channel: channel._id, message: "Subscription successfull!" });
});

const unsubscribe = catchAsyncErrors(async (req, res, next) => {
  const idParam = req.params.id;
  const currentUser = req.user._id;

  const channel = await User.findById(idParam);

  await User.findByIdAndUpdate(currentUser, {
    $pull: { subscribedUsers: idParam },
  });

  await User.findByIdAndUpdate(idParam, {
    $inc: { subscribers: -1 },
  });

  res
    .status(200)
    .json({ channel: channel._id, message: "Unsubscription successfull!" });
});

const like = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const videoId = req.params.id;

  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { likes: userId },
    $pull: { dislikes: userId },
  });

  res.status(200).json({ userId, success: true });
});

const unlike = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const videoId = req.params.id;

  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { dislikes: userId },
    $pull: { likes: userId },
  });

  res.status(200).json({ userId, success: true });
});

export {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  unlike,
};
