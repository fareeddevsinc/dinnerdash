const mongoose = require("mongoose");

const restaurant = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the restaurant Name"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please Enter the restaurant location"],
    unique: true,
  },
  branch: {
    type: String,
    required: [true, "Please Enter the restaurant branch"],
  },
});

const Restaurant = mongoose.model("Restaurant", restaurant);

module.exports = Restaurant;
