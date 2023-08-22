const ErrorHandler = require("../utils/errorHandler");
const Restaurant = require("../models/restaurantModel");

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Restaurant deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!restaurant) {
      return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const viewRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const viewAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  viewRestaurant,
  viewAllRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
};
