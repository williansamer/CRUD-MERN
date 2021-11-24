const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    }
});

const FoodData = mongoose.model("Food", FoodSchema);

module.exports = FoodData;