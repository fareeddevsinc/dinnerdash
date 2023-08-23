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
} = require("../controllers/cartControllers");

const router = express.Router();

router.route("/cart").get(isAuthenticatedUser, getAllCartItems);

router.route("/cart/:id").delete(isAuthenticatedUser, deleteCartItem);

router.route("/cart").delete(isAuthenticatedUser, deleteAllCartItems);

router
  .route("/product/:id")
  .post(isAuthenticatedUserForPut, createOrUpdateCart);

module.exports = router;
