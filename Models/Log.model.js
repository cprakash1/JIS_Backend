const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: "No Token Provided",
    },
    method: {
      type: String,
      default: "No Method Provided",
    },
    url: {
      type: String,
      default: "No URL Provided",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
