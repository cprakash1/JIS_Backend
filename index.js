require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./Config/db");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const Log = require("./Models/Log.model");
const jwtClass = require("./Utils/jwt.class");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use(async (req, res, next) => {
  try {
    const log = new Log({
      method: req.method,
      url: req.url,
      id: JSON.stringify(await jwtClass.getPayload(req?.body?.loginToken)),
    });
    await log.save();
    next();
  } catch (err) {
    const log = new Log({
      method: req.method,
      url: req.url,
      id: "Error Occured",
    });
    await log.save();
    next();
  }
});

app.use("/registrar", require("./Routes/Registrar.route"));
app.use("/lawyer", require("./Routes/Lawyer.route"));
app.use("/judge", require("./Routes/Judge.route"));
app.use("/util", require("./Routes/Util.route"));

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
