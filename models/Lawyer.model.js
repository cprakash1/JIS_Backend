const mongoose = require("mongoose");
const Court = require("./Court.model");
const Case = require("./Case.model");
const Payment = require("./Payment.model");

const LawyerSchema = new mongoose.Schema(
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
    paymentLeft: {
      type: Number,
      default: 0,
    },
    paymentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    casesSeen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
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

module.exports = mongoose.model("Lawyer", LawyerSchema);
