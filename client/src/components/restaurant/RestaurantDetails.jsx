import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";

import {
  clearErrors,
  getRestaurantDetails,
} from "../../redux/actions/restaurantAction";

import "../../styles/product/ProductDetails.css";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { restaurant, loading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getRestaurantDetails(id));
  }, [dispatch, id, error, alert]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <MetaData title={`${restaurant.restaurant?.name} -- DinnerDash`} />
          <div className="RestaurantDetails">
            <div>
              <div className="detailsBlock-1">
                <h2>{restaurant.restaurant?.name}</h2>
                <p>restaurant # {restaurant?._id}</p>
              </div>

              <div className="detailsBlock-4">
                Branch : <p>{restaurant.restaurant?.branch}</p>
              </div>

              <div className="detailsBlock-4">
                Location : <p>{restaurant.restaurant?.location}</p>
              </div>
            </div>
          </div>

          <h3 className="reviewsHeading">PRODUCTS</h3>

          {/* {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Products Yet</p>
          )} */}
        </>
      )}
    </>
  );
};

export default RestaurantDetails;
