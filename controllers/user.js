import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, phoneNo, password } = req.body;
  const checkIfUserExist = await User.findOne({ phoneNo });
  if (checkIfUserExist) {
    return res.status(400).json({
      success: false,
      message: "user already exists.",
    });
  }
  const user = await User.create({
    name,
    phoneNo,
    password,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    return res.status(400).json({
      success: false,
      message: "user not created",
    });
  }

  return res.status(201).json({
    success: true,
    msg: "User registered successfully",
  });
};

export const login = async (req, res) => {
  const { phoneNo, password } = req.body;
  try {
    const user = await User.findOne({ phoneNo });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // Direct string comparison for the password
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = { userId: user._id, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const userTest = async (req, res) => {
  try {
    res.status(200).json({
      message: "Hello from user route",
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchPrice = async (req, res) => {};
