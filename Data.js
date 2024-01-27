const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    AX: {
      type: Number,
      required: true,
    },
    AY: {
      type: Number,
      required: true,
    },
    AZ: {
      type: Number,
      required: true,
    },
    GX: {
      type: Number,
      required: true,
    },
    GY: {
      type: Number,
      required: true,
    },
    GZ: {
      type: Number,
      required: true,
    },
    GPS_Lat: {
      type: Number,
      required: true,
    },
    GPS_Long: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);
