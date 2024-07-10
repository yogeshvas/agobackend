import { CabOrder } from "../models/cab-order.js";

import moment from "moment";
import { Driver } from "../models/driver.js";

export const dashboardData = async (req, res) => {
  try {
    // Get the start and end of the current day
    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();

    // Find orders within the date range
    const orders = await CabOrder.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    const cabOrdersNumber = orders.length;

    // Find the 5 most recent orders
    const fiveMostRecentOrders = await CabOrder.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      cabOrders: cabOrdersNumber,
      fiveMostRecentOrders,
    });
  } catch (error) {
    console.log("error in admin dashbord data controller");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cabOrdersData = async (req, res) => {
  try {
    const orders = await CabOrder.find()
      .populate("user")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching cab orders:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const driverAvailableForOrders = async (req, res) => {
  try {
    const drivers = await Driver.find({ status: true }).select(
      "_id name carNumber phone"
    );
    return res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const allDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    return res.status(200).json(drivers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const allotDriver = async (req, res) => {
  try {
 
    const { cabOrderId, driverId } = req.body;
    console.log(cabOrderId, driverId);
    // Validate cabOrderId and driverId
    if (!cabOrderId || !driverId) {
      return res
        .status(400)
        .json({ message: "Cab Order ID and Driver ID are required" });
    }

    const cabOrder = await CabOrder.findById(cabOrderId);

    // Check if the cab order exists
    if (!cabOrder) {
      return res.status(404).json({ message: "Cab Order not found" });
    }

    // Check if the driver exists (assuming you have a Driver model)
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Update the cab order
    cabOrder.status = "ACCEPTED";
    cabOrder.driver = driverId;
    await cabOrder.save();
    const finalResponse = await CabOrder.findById(cabOrderId).populate(
      "driver"
    );
    return res.status(200).json({ message: "Driver Alloted", finalResponse });
  } catch (error) {
    console.error("Error allotting driver:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
