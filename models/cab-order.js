import mongoose from "mongoose";

const cabOrderSchema = new mongoose.Schema(
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
  },

  {
    timestamps: true,
  }
);

export const CabOrder = mongoose.model("CabOrder", cabOrderSchema);
