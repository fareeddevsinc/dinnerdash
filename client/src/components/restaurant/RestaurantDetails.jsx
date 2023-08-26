import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "../../styles/product/ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getRestaurantDetails,
} from "../../actions/restaurantAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { restaurant, loading, error } = useSelector(
    (state) => state.restaurantDetails
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
          <MetaData title={`${restaurant.name} -- DinnerDash`} />
          <div className="RestaurantDetails">
            <div>
              <Carousel>
                {restaurant.images &&
                  restaurant.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{restaurant.name}</h2>
                <p>restaurant # {restaurant._id}</p>
              </div>

              <div className="detailsBlock-4">
                Branch : <p>{restaurant.branch}</p>
              </div>

              <div className="detailsBlock-4">
                Location : <p>{restaurant.location}</p>
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
