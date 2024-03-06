const mongoose = require("mongoose");

const TempSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Temp", TempSchema);
