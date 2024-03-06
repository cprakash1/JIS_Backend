const mongoose = require("mongoose");

const SummerySchema = new mongoose.Schema(
  {
    case: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Summery", "Adjourned"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Summery", SummerySchema);
