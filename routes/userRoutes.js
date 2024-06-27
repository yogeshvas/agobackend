import { Router } from "express";
import {
  getActiveRequests,
  login,
  registerUser,
  userTest,
} from "../controllers/user.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/usertest").get(userTest);
router.route("/getactiverequests").get(getActiveRequests);

export default router;
