import mongoose from "mongoose";

// Define the schema
const rateSchema = new mongoose.Schema({
  carType: {
    type: String,
    enum: ["small", "medium", "large"],
    required: true,
  },
  perKilometerRate: {
    type: Number,
    default: 100,
  },
});

const Rate = mongoose.model("Rate", rateSchema);

export default Rate;
