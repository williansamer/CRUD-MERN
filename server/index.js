require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
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
app.use(cors());

app.post("/insert", (req, res) => {
  const foodName = req.body.name;
  const foodCalories = req.body.calories;
  const foods = new FoodData({ name: foodName, calories: foodCalories });

  try {
    foods.save();
    res.send("Food saved");
  } catch (err) {
    res.send(err);
  }
});

app.get("/", (req, res) => {
    FoodData.find({}, (err, result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
        
    })
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}..`);
});
