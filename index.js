require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./Config/db");
const cors = require("cors");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/registrar", require("./Routes/Registrar.route"));
app.use("/lawyer", require("./Routes/Lawyer.route"));
app.use("/judge", require("./Routes/Judge.route"));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
