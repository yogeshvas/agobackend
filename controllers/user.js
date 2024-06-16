import { User } from "../models/user.js";

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
