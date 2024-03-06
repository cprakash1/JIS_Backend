const mongoose = require("mongoose");

const CourtSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cases: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Case",
      },
    ],
    default: [],
  },
  registrar: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registrar",
      },
    ],
  },
  judges: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Judge",
      },
    ],
  },
  lawyers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lawyer",
      },
    ],
  },
  publicProsecutors: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lawyer",
      },
    ],
  },
});

mongoose.models = {};

module.exports = mongoose.models.Court || mongoose.model("Court", CourtSchema);
