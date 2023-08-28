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
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_FAIL,
  DELETE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAIL,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/restaurantConstants";

import {
  getAllRestaurantsApi,
  getRestaurantDetailsApi,
  addRestaurantApi,
  updateRestaurantApi,
  deleteRestaurantApi,
} from "../api/restaurant/restaurantApi";

import axios from "axios";

export const getRestaurant =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_RESTAURANT_REQUEST });
      let link = `http://localhost:8000/api/v1/restaurants?keyword=${keyword}&page=${currentPage}`;
      const { data } = await axios.get(link);

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

export const getAllRestaurants = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_RESTAURANT_REQUEST });

    const { data } = await getAllRestaurantsApi();

    console.log(data);

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
      payload: error.response?.data?.message,
    });
  }
};

export const addRestaurant = (restaurantData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_RESTAURANT_REQUEST });

    const config = requestHeader("multipart/form-data");

    const { data } = await addRestaurantApi(restaurantData, config);

    console.log(data);

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

// Update Restaurant
export const updateRestaurant = (id, RestaurantData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });

    const config = requestHeader();

    const { data } = await updateRestaurantApi(id, RestaurantData, config);

    dispatch({
      type: UPDATE_RESTAURANT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RESTAURANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Restaurant
export const deleteRestaurant = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });

    const config = requestHeader();

    const { data } = await deleteRestaurantApi(id, config);

    dispatch({
      type: DELETE_RESTAURANT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RESTAURANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
