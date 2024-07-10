import { Router } from "express";
import { bookCab, getRate } from "../controllers/cab-order.js";

const router = Router();

router.route("/bookcab").post(bookCab);
router.route("/get-cab-rates").get(getRate);
export default router;
