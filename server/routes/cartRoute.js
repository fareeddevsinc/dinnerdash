const express = require("express");

const { isAuthenticatedUser } = require("../middlewares/auth");

const {
  getAllCartItems,
  deleteCartItem,
  createOrUpdateCart,
  deleteAllCartItems,
} = require("../controllers/cartControllers");

const router = express.Router();

router.route("/cart").get(isAuthenticatedUser, getAllCartItems);

router.route("/cart").delete(isAuthenticatedUser, deleteCartItem);

router.route("/delete-cart").delete(isAuthenticatedUser, deleteAllCartItems);

router.route("/cart").post(isAuthenticatedUser, createOrUpdateCart);

module.exports = router;
