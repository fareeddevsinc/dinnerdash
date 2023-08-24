const express = require("express");

const {
  isAuthenticatedUser,
  isAuthenticatedUserForPut,
} = require("../middlewares/auth");

const {
  getAllCartItems,
  deleteCartItem,
  createOrUpdateCart,
  deleteAllCartItems,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cartControllers");

const router = express.Router();

router.route("/cart").get(isAuthenticatedUser, getAllCartItems);

router.route("/cart/:id").delete(isAuthenticatedUser, removeItemFromCart);

router.route("/cart").delete(isAuthenticatedUser, clearCart);

router.route("/cart/:id").post(isAuthenticatedUser, createOrUpdateCart);

module.exports = router;
