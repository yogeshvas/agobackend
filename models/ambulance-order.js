import mongoose from "mongoose";

const ambulanceOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start: {
      latitude: {
        type: Number,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },
    },
    end: {
      latitude: {
        type: Number,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    status: {
      type: String,
      enum: ["REQUESTED", "ACCEPTED", "COMPLETED"],
      default: "REQUESTED",
    },
    date: {
      type: String,
      default: Date.now(),
    },
    time: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export const AmbulanceOrder = mongoose.model(
  "AmbulanceOrder",
  ambulanceOrderSchema
   );
