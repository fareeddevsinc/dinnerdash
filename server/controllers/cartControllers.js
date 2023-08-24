const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel");

const getAllCartItems = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id })
      .populate("user")
      .populate("products.product");

    console.log(cart);

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

const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // If the cart doesn't exist, return an error
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // If the cart exists, update it
    const productIndex = cart.products.findIndex(
      (cartItem) => cartItem.product.toString() === req.params.id.toString()
    );

    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
    } else {
      // If the product is not found in the cart, return an error
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
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
      cart = await Cart.create({
        user: req.user.id,
        products: [
          {
            product: req.params.id,
            quantity: req.body.quantity,
          },
        ],
      });
    } else {
      // If the cart exists, update it
      const productIndex = cart.products.findIndex(
        (cartItem) => cartItem.product.toString() === req.params.id.toString()
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = req.body.quantity;
      } else {
        cart.products.push({
          product: req.params.id,
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

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // If the cart doesn't exist, return an error
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // If the cart exists, clear it
    cart.products = [];
    cart.totalPrice = 0;
    cart.totalQuantity = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCartItems,
  removeItemFromCart,
  createOrUpdateCart,
  clearCart,
};
