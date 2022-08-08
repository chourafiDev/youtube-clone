import Comment from "../models/Comment.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import Video from "../models/Video.js";

const getComments = catchAsyncErrors(async (req, res, next) => {
  const videoId = req.params.videoId;
  const comments = await Comment.find({ videoId }).populate({
    path: "userId",
    models: "User",
    select: "name img -_id",
  });

  res.status(200).json(comments);
});

const addComment = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const videoId = req.params.videoId;

  console.log("req.body.desc", req.body.desc);

  const newComment = new Comment({
    userId,
    videoId,
    desc: req.body.desc,
  });

  await newComment.save();

  res.status(200).json({ newComment, message: "Comment added successfully" });
});

const deleteComment = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const commentId = req.params.videoId;
  const videoId = req.query.videoId;

  const comment = await Comment.findById(commentId);
  const video = await Video.findById(videoId);

  if (userId === comment.userId || userId === video.userId) {
    await Comment.findByIdAndDelete(commentId);
    res
      .status(200)
      .json({ id: comment._id, message: "Comment deleted successfully" });
  } else {
    res
      .status(200)
      .json({ message: "You don't have access to delete this comment" });
  }
});

export { getComments, addComment, deleteComment };
