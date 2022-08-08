import exporess from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/commentController.js";

import { isAuthontecated } from "../middlewares/authMiddleware.js";

const router = exporess.Router();

router.get("/:videoId", getComments);
router.post("/add-comment/:videoId", isAuthontecated, addComment);
router.delete("/delete-comment/:videoId", isAuthontecated, deleteComment);

export default router;
