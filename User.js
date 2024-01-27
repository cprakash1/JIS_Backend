const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dataList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
