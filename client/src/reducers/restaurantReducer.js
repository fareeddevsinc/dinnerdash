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
  CLEAR_ERRORS,
} from "../constants/restaurantConstants";

export const restaurantsReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case ALL_RESTAURANT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_RESTAURANT_SUCCESS:
      return {
        loading: false,
        restaurants: action.payload,
      };
    case ALL_RESTAURANT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const restaurantDetailsReducer = (
  state = { restaurant: {} },
  action
) => {
  switch (action.type) {
    case RESTAURANT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case RESTAURANT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case RESTAURANT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const addRestaurantReducer = (state = { restaurant: {} }, action) => {
  switch (action.type) {
    case ADD_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_RESTAURANT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case ADD_RESTAURANT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
