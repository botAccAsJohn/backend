import { Router } from "express";
import authenticateUser from "../utils/auth.js";

import {
  loginUser,
  logoutUser,
  registerUser,
  getUserDetails,
  refreshAccessToken,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(registerUser); // full route : /api/auth/signup
router.route("/getuserdetail").get(authenticateUser, getUserDetails);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/refresh").post(refreshAccessToken);

export default router;
