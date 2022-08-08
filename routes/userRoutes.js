import exporess from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  unlike,
} from "../controllers/userController.js";
import { isAuthontecated } from "../middlewares/authMiddleware.js";

const router = exporess.Router();

// router.put("/:id", isAuthontecated, updateUser);
// router.delete("/:id", isAuthontecated, deleteUser);
router.get("/find/:id", getUser);
router.put("/sub/:id", isAuthontecated, subscribe);
router.put("/unsub/:id", isAuthontecated, unsubscribe);
router.put("/like/:id", isAuthontecated, like);
router.put("/unlike/:id", isAuthontecated, unlike);

export default router;
