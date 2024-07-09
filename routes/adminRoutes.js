import express from "express";
import { cabOrdersData, dashboardData } from "../controllers/admin.js";

const router = express.Router();

router.route("/").get(dashboardData);
router.route("/cab-orders").get(cabOrdersData);
export default router;
