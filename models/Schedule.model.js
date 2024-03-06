const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Court",
    required: true,
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Judge",
    required: true,
  },
  lawyers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
    },
  ],
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
