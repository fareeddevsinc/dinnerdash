import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import "../../styles/product/Product.css";

const categories = ["laptop", "Footwear", "Tops"];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { key } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  const keyword = key;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const ratingHandler = (event, newRating) => {
    setRatings(newRating);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  let count = filteredProductCount;
  return (
    <div className="products-container">
      <MetaData title="All Dishes --DinnerDash" />

      {products &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

      <div className="slider-container">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />
      </div>

      <div className="categories-container">
        <Typography>Categories</Typography>
        <ul className="categories-list">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setCategory(category)}
              className="category-item"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="ratings-container">
        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={ratingHandler}
            valueLabelDisplay="auto"
            aria-labelledby="continuous-slider"
            min={0}
            max={5}
          />
        </fieldset>
      </div>

      {resultPerPage < count && (
        <div className="pagination-container">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </div>
  );
};

export default Products;
