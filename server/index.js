require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const FoodData = require("./models/FoodData");

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to mongodb");
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  const foods = new FoodData({ name: "Pizza", calories: 500 });
  try {
    foods.save();
    res.send("Food saved");
  } catch (err) {
    res.send(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}..`);
});
