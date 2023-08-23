const ErrorHandler = require("../utils/errorHandler");
require("dotenv").config({ path: "../config/config.env" });
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Token Not Found", 401));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return next(new ErrorHandler("Please Login to Access this Page", 401));
  }
};

const isAuthenticatedUserForPut = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return next(new ErrorHandler("Token Not Found", 401));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return next(new ErrorHandler("Please Login to Access this Page", 401));
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.query.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.query.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedUserForPut,
};
