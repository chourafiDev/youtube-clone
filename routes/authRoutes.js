import exporess from "express";
import { register, login } from "../controllers/authController.js";

const router = exporess.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
