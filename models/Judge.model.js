const mongoose = require("mongoose");

const JudgeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
      required: true,
    },
    cases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
      },
    ],
    casesSeen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
      },
    ],
    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Summery",
      },
    ],
  },
  { strictPopulate: false }
);

module.exports = mongoose.model("Judge", JudgeSchema);
