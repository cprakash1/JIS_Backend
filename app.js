require("dotenv").config();
const express = require("express");
const app = express();
const mongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

const User = require("./User"); // User.js
const Data = require("./Data"); // Data.js
mongoose.connect(process.env.Db_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database");
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.post("/signup", async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const query = { email: newUser.email };

  const result = await User.findOne(query);
  if (!result) {
    await User.create(newUser);
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});

app.post("/login", async (req, res) => {
  const query = {
    email: req.body.email,
    password: req.body.password,
  };

  const result = await User.findOne(query);
  if (result !== null) {
    const objToSend = {
      name: result.name,
      email: result.email,
    };
    res.status(200).send(JSON.stringify(objToSend));
  } else {
    res.status(404).send();
  }
});

app.post("/data", async (req, res) => {
  // console.log(req.body);
  const data = req.body.data.split("\n");
  // console.log(data);
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    for (const element of data) {
      const dataList = element.split(", ");
      // console.log(dataList);
      if (dataList.length === 5) {
        const AX = dataList[0];
        const AY = dataList[1];
        const AZ = dataList[2];
        const date = dataList[3];
        const time = dataList[4];

        const newData = await Data.create({
          AX,
          AY,
          AZ,
          date,
          time,
        });
        // console.log(newData);
        user.dataList.push(newData);
      }
      await user.save();
      // console.log(user);
    }
  } catch (err) {
    console.log(err);
  }
  res.status(200).send();
});

app.get("/connect", (req, res) => {
  res.status(200).send();
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
