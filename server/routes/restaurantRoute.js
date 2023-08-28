const express = require("express");

const {
  isAuthenticatedUser,
  isAuthenticatedUserForPut,
  authorizeRoles,
} = require("../middlewares/auth");

const {
  viewRestaurant,
  viewAllRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

router.route("/restaurants").get(viewAllRestaurants);

router.route("/restaurant/:id").get(viewRestaurant);

router
  .route("/restaurant/:id")
  .delete(isAuthenticatedUserForPut, authorizeRoles("admin"), deleteRestaurant);

router
  .route("/restaurant/new")
  .post(isAuthenticatedUserForPut, authorizeRoles("admin"), createRestaurant);

router
  .route("/restaurant/:id")
  .put(isAuthenticatedUserForPut, authorizeRoles("admin"), updateRestaurant);

module.exports = router;
