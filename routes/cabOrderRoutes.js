import { Router } from "express";
import { bookCab } from "../controllers/cab-order.js";

const router = Router();

router.route("/cabbook").post(bookCab);
export default router;
