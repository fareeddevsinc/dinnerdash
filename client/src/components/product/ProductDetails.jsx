import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";

import ReviewCard from "./ReviewCard";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {" "}
          <MetaData title={`${product.name} --DinnerDash`} />
          <div>
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img key={item.url} src={item.url} alt="Slide" />
                ))}
            </Carousel>
          </div>
          <div>
            <h2>{product.name}</h2>
            <p>{product._id}</p>
            <div>
              <ReactStars {...options} />
              <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div>
              <h2>{product.price}</h2>
            </div>
            <div>
              <button>-</button>
              <input type="number" value="1" />
              <button>+</button>
            </div>
            <div>
              <button>Add To Cart</button>
            </div>
            <div>Status: {product.stock < 1 ? "Out Of Stock" : "In Stock"}</div>
          </div>
          <div>{product.description}</div>
          <div>
            <button>Submit Review</button>
          </div>
          <div>
            <h1>Reviews</h1>
            {product.reviews && product.reviews[0]
              ? product.reviews.map((review) => <ReviewCard review={review} />)
              : "No Reviews Uptil Now"}
          </div>{" "}
        </>
      )}
    </>
  );
};

export default ProductDetails;
