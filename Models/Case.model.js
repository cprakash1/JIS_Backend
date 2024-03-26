const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema(
  {
    defendantName: {
      type: String,
      required: true,
    },
    defendantAddress: {
      type: String,
      required: true,
    },
    crimeType: {
      type: String,
      required: true,
    },
    dateCommitted: {
      type: Date,
      required: true,
    },
    locationCommitted: {
      type: String,
      required: true,
    },
    arrestingOfficer: {
      type: String,
      required: true,
    },
    arrestDate: {
      type: Date,
      required: true,
    },
    CIN: {
      type: String,
      required: true,
      unique: true,
    },
    judge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Judge",
      required: true,
    },
    lawyers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Lawyer",
        },
      ],
      minlength: 1,
    },
    publicProsecutor: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Lawyer",
        },
      ],
      minlength: 1,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "closed"],
      default: "pending",
      required: true,
    },
    victim: {
      type: String,
      required: true,
    },
    summery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Summery",
      },
    ],
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
      required: true,
    },
    nextHearing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    closedAt: {
      type: Date,
      required: false,
    },
  },
  { strictPopulate: false }
);

mongoose.models = {};

const Case = mongoose.models.Case || mongoose.model("Case", CaseSchema);
module.exports = Case;
//
