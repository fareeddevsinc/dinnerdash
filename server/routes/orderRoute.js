const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedUserForPut,
} = require("../middlewares/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUserForPut, newOrder);

router.route("/order/:id").get(isAuthenticatedUserForPut, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUserForPut, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUserForPut, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUserForPut, authorizeRoles("admin"), updateOrder);

router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUserForPut, authorizeRoles("admin"), deleteOrder);

module.exports = router;
