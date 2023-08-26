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
  },
  branch: {
    type: String,
    required: [true, "Please Enter the restaurant branch"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurant);

module.exports = Restaurant;
