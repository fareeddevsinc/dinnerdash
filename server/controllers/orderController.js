const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

const newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//get single order
const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//get logged in user orders
const myOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//get all orders (admin)
const getAllOrders = async (req, res, next) => {
  try {
    const order = await Order.find();

    let totalAmount = 0;

    order.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("Order Already Delivered", 200));
    }

    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ ValidateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};