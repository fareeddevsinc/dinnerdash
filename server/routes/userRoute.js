const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  updatePassword,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedUserForPut,
} = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.put("/me/update", isAuthenticatedUserForPut, updateProfile);

router.put("/password/update", isAuthenticatedUserForPut, updatePassword);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);

router
  .route("/admin/user/:id")
  .put(isAuthenticatedUserForPut, authorizeRoles("admin"), updateUserRole);

router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUserForPut, authorizeRoles("admin"), deleteUser);

module.exports = router;
