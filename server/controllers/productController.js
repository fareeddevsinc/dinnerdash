const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");
const Restaurant = require("../models/restaurantModel");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create product --admin
const createProduct = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { name, price, description, category, stock, restaurant } = req.body;
    const findRestaurant = await Restaurant.findOne({ name: restaurant });
    if (findRestaurant) {
      const user = await Product.create({
        name,
        price,
        description,
        category,
        stock,
        images: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        restaurant,
        user: req.user.id,
      });
    }
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 4;
    const productsCount = await Product.countDocuments();

    //for query in url inadvanced way from apiFeature.js
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = apiFeature.query;
    let filteredProductCount = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query;

    if (products) {
      res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductCount,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product ID Not Found", 404));
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const newProductData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.description,
      stock: req.body.stock,
      user: req.user.id,
    };
    newProductData.images = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      newProductData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    console.log("11");

    res.status(200).json({
      success: true,
      updateProduct,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Internal Server Error", 500));
    }
    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    console.log(`product details: ${product}`);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//create/update review
const createProductReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => {
      rev.user.toString() === req.user._id.toString();
    });
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({ success: true, message: "Review Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all reviews of a product
const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    return next(new ErrorHandler("Invalid ID", 500));
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    console.log(product.reviews);
    const reviews = product.reviews.filter((rev) => {
      return rev._id.toString() !== req.query.id.toString();
    });
    console.log(reviews);
    let avg = 0;
    reviews.forEach((rev) => {
      avg += Number(rev.rating);
    });
    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// Get All Product (Admin)
const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
};
