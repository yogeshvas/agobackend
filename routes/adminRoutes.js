import express from "express";
import {
  allDrivers,
  cabOrdersData,
  dashboardData,
  driverAvailableForOrders,
} from "../controllers/admin.js";

const router = express.Router();

router.route("/").get(dashboardData);
router.route("/cab-orders").get(cabOrdersData);
router.route("/drivers-available").get(driverAvailableForOrders);
router.route("/drivers").get(allDrivers);
export default router;
