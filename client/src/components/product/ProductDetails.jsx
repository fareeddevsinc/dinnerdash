import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@material-ui/lab";

import MetaData from "../layout/MetaData";
import ReviewCard from "./ReviewCard";

import {
  increaseQuantity,
  decreaseQuantity,
  addToCartHandler,
} from "../../helpers/products/productDetailsHelper";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../redux/actions/productAction";
import { addItemsToCart } from "../../redux/actions/cartAction";
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";

import "../../styles/product/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = useMemo(
    () => ({
      size: "large",
      value: product?.ratings,
      readOnly: true,
      precision: 0.5,
    }),
    [product?.ratings]
  );

  const submitReviewToggle = useCallback(() => {
    open ? setOpen(false) : setOpen(true);
  }, [open]);

  const reviewSubmitHandler = useCallback(() => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  }, [dispatch, rating, comment, id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <MetaData title={`${product?.name} -- DinnerDash`} />
          <div className="ProductDetails">
            <div>
              {product?.images && (
                <img
                  className="CarouselImage"
                  src={product?.images?.url}
                  alt={`Product Image`}
                />
              )}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <p>Product # {product?._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product?.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs.${product?.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button
                      onClick={() => decreaseQuantity(quantity, setQuantity)}
                    >
                      -
                    </button>
                    {quantity}
                    <button
                      onClick={() =>
                        increaseQuantity(product, quantity, setQuantity)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={product?.stock < 1 ? true : false}
                    onClick={() =>
                      addToCartHandler(
                        id,
                        quantity,
                        dispatch,
                        addItemsToCart,
                        alert
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                    {product?.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product?.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product?.reviews &&
                product?.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
