import requestHeader from "../helpers/requestHeaders";
import {
  ALL_RESTAURANT_REQUEST,
  ALL_RESTAURANT_SUCCESS,
  ALL_RESTAURANT_FAIL,
  ADD_RESTAURANT_REQUEST,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAIL,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
  RESTAURANT_DETAILS_FAIL,
} from "../constants/restaurantConstants";

import {
  getAllRestaurantsApi,
  getRestaurantDetailsApi,
  addRestaurantApi,
} from "../api/restaurant/restaurantApi";

export const getAllRestaurants = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_RESTAURANT_REQUEST });

    const { data } = await getAllRestaurantsApi();

    dispatch({
      type: ALL_RESTAURANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_RESTAURANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getRestaurantDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_DETAILS_REQUEST });

    const { data } = await getRestaurantDetailsApi(id);

    dispatch({
      type: RESTAURANT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESTAURANT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addRestaurant = (restaurantData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_RESTAURANT_REQUEST });

    const config = requestHeader("multipart/form-data");

    const { data } = await addRestaurantApi(restaurantData, config);

    dispatch({
      type: ADD_RESTAURANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_RESTAURANT_FAIL,
      payload: error.response.data.message,
    });
  }
};
