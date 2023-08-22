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
  ratings: {
    type: Number,
    default: 0,
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
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurant);

module.exports = Restaurant;
