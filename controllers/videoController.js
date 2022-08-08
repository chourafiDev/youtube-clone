import Video from "../models/Video.js";
import User from "../models/User.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

//Create new video
const createVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, desc, tags, videoUrl, imgUrl } = req.body;

  const video = new Video();
  video.userId = req.user._id;
  video.title = title;
  video.desc = desc;
  video.tags = tags;
  video.videoUrl = videoUrl;
  video.imgUrl = imgUrl;

  await video.save();

  res.status(201).json({ video, message: "Video has been added successfully" });
});

//Get video by Id
const getVideo = catchAsyncErrors(async (req, res, next) => {
  const idParam = req.params.id;

  const video = await Video.findById(idParam).populate({ path: "userId" });

  res.status(200).json(video);
});

//Update video
const updateVideo = catchAsyncErrors(async (req, res, next) => {
  const currnetUser = req.user._id;
  const idParam = req.params.id;

  const video = await Video.findById(idParam);

  if (!video) {
    return next(new ErrorHandler("Video not found with this Id"));
  }

  if (currnetUser === video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(
      idParam,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(200)
      .json({ updatedVideo, message: "Video updated successfully" });
  } else {
    return next(
      new ErrorHandler("You don't have access to upadate this ressource", 403)
    );
  }
});

//Delete video
const deleteVideo = catchAsyncErrors(async (req, res, next) => {
  const currnetUser = req.user._id;
  const idParam = req.params.id;

  const video = await Video.findById(idParam);

  if (!video) {
    return next(new ErrorHandler("Video not found with this Id"));
  }

  if (currnetUser === video.userId) {
    await Video.findByIdAndDelete(idParam);

    res.status(200).json({ message: "Video deleted successfully" });
  } else {
    return next(
      new ErrorHandler("You don't have access to delete this ressource", 403)
    );
  }
});

//Add view
const addView = catchAsyncErrors(async (req, res, next) => {
  const idParam = req.params.id;

  await Video.findByIdAndUpdate(idParam, {
    $inc: { views: 1 },
  });

  res.status(200).json();
});

//Trend videos
const terndVideos = catchAsyncErrors(async (req, res, next) => {
  const terndVideos = await Video.find().sort({ views: -1 }).populate({
    path: "userId",
    models: "User",
    select: "name img -_id",
  });

  res.status(200).json(terndVideos);
});

//Random videos
const randomVideos = catchAsyncErrors(async (req, res, next) => {
  // const randomVideos = await Video.aggregate([
  //   { $sample: { size: 40 } },
  //   {
  //     $lookup: {
  //       from: "User",
  //       localField: "userId",
  //       foreignField: "_id",
  //       as: "user",
  //     },
  //   },
  // ]);

  const randomVideos = await Video.find({
    $expr: { $rand: {} },
  }).populate({
    path: "userId",
    models: "User",
    select: "name img -_id",
  });

  res.status(200).json(randomVideos);
});

//Sub videos
const subVideos = catchAsyncErrors(async (req, res, next) => {
  const currnetUser = req.user._id;

  const user = await User.findById(currnetUser);

  let subscribedChannels = user.subscribedUsers;

  const subVideos = await Promise.all(
    subscribedChannels.map((id) =>
      Video.find({ userId: id }).populate({
        path: "userId",
        models: "User",
        select: "name img -_id",
      })
    )
  );

  res
    .status(200)
    .json(subVideos.flat().sort((a, b) => b.createdA - a.createdA));
});

//Get videos by tags
const videosByTag = catchAsyncErrors(async (req, res, next) => {
  const queryTags = req.query.tags.split(",");

  const videos = await Video.find({ tags: { $in: queryTags } })
    .limit(20)
    .populate({
      path: "userId",
      models: "User",
      select: "name img -_id",
    });

  res.status(200).json(videos);
});

//Get videos by title
const search = catchAsyncErrors(async (req, res, next) => {
  const queryTitle = req.query.title;

  const videos = await Video.find({
    title: { $regex: queryTitle, $options: "i" },
  }).limit(40);

  res.status(200).json(videos);
});

export {
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
  addView,
  terndVideos,
  randomVideos,
  subVideos,
  videosByTag,
  search,
};
