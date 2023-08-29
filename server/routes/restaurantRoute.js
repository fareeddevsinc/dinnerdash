const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const {
  viewRestaurant,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurantController");

const router = express.Router();

router.route("/restaurants").get(getAllRestaurants);

router.route("/restaurant/:id").get(viewRestaurant);

router
  .route("/restaurant/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRestaurant);

router
  .route("/restaurant/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createRestaurant);

router
  .route("/restaurant/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateRestaurant);

module.exports = router;
