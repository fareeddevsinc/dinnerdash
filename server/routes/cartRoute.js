const express = require("express");

const {
  isAuthenticatedUser,
  isAuthenticatedUserForPut,
} = require("../middlewares/auth");

const {
  getAllCartItems,
  createOrUpdateCart,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cartControllers");

const router = express.Router();

router.route("/cart").get(isAuthenticatedUser, getAllCartItems);

router.route("/cart/:id").delete(isAuthenticatedUserForPut, removeItemFromCart);

router.route("/cart").delete(isAuthenticatedUser, clearCart);

router.route("/cart/:id").post(isAuthenticatedUserForPut, createOrUpdateCart);

module.exports = router;
