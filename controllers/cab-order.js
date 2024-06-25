import { CabOrder } from "../models/cab-order.js";
import jwt from "jsonwebtoken";
import Rate from "../models/rate.js";

export const bookCab = async (req, res) => {
  try {
    const { token } = req.headers; // Use headers to get token
    const { startLat, startLong, endLat, endLong } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!startLat || !startLong || !endLat || !endLong) {
      return res
        .status(400)
        .json({ message: "All location fields are required" });
    }

    // Create the cab order
    const cabOrder = await CabOrder.create({
      user: decodedUser.userId,
      start: {
        latitude: startLat,
        longitude: startLong,
      },
      end: {
        latitude: endLat,
        longitude: endLong,
      },
      status: "REQUESTED", // Default status
    });

    res.status(201).json({ message: "Cab order successfully", cabOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while booking the cab",
      error: error.message,
    });
  }
};

export const getRate = async (req, res) => {
  try {
    const rates = await Rate.find();
    if (!rates) {
      return res.status(404).json({ message: "Rates not found" });
    }
    res.status(200).json(rates);
  } catch (error) {
    console.error("Error fetching rates:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
