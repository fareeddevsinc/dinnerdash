const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const {
  viewRestaurant,
  viewAllRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

router.route("/restaurant").get(viewAllRestaurants);

router.route("/restaurant/:id").get(viewRestaurant);

router
  .route("/restaurant/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRestaurant);

router
  .route("/restaurant")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createRestaurant);

router
  .route("/restaurant/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateRestaurant);

module.exports = router;