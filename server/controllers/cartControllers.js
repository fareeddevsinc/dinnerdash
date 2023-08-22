const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel");

const getAllCartItems = async (req, res) => {
  try {
    const cart = await Cart.find({});

    if (cart) {
      res.status(200).json({
        success: true,
        cart,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    //ig it should be req.body._id
    const cart = await Cart.findByIdAndDelete(req.body._id);

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Cart item deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createOrUpdateCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      req.body.user = req.user.id;
      cart = await Cart.create(req.body);
    } else {
      // If the cart exists, update it
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === req.body.product
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = req.body.quantity;
      } else {
        cart.products.push({
          product: req.body.product,
          quantity: req.body.quantity,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAllCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }

    cart.products = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "All items removed from cart",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCartItems,
  deleteCartItem,
  createOrUpdateCart,
  deleteAllCartItems,
};
