import exporess from "express";
import {
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
} from "../controllers/videoController.js";
import { isAuthontecated } from "../middlewares/authMiddleware.js";

const router = exporess.Router();

router.post("/", isAuthontecated, createVideo);
router.put("/:id", isAuthontecated, updateVideo);
router.delete("/:id", isAuthontecated, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", terndVideos);
router.get("/random", randomVideos);
router.get("/sub", isAuthontecated, subVideos);
router.get("/tags", videosByTag);
router.get("/search", search);

export default router;
