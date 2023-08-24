import {
  addItemsToCartApi,
  getAllCartItemsApi,
  removeItemsFromCartApi,
  deleteCartApi,
  saveShippingInfoApi,
} from "../api/cart/cartApi";
import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  ADD_CART_ITEM_REQUEST,
  ADD_CART_ITEM_FAIL,
  ADD_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAIL,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAIL,
  SHIPPING_INFO_REQUEST,
  SHIPPING_INFO_SUCCESS,
  SHIPPING_INFO_FAIL,
} from "../constants/cartConstants";

import requestHeader from "../helpers/requestHeaders";

export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const { data } = await getAllCartItemsApi();

    // console.log(data.cart[0].products[0].product.name);

    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addItemsToCart = (id, quantity) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CART_ITEM_REQUEST });

    const config = requestHeader();

    const { data } = await addItemsToCartApi(id, quantity, config);

    dispatch({
      type: ADD_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CART_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const removeItemsFromCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_ITEM_REQUEST });

    const config = requestHeader();

    const { data } = await removeItemsFromCartApi(id, config);

    dispatch({
      type: DELETE_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCart = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_REQUEST });

    const { data } = await deleteCartApi();

    dispatch({
      type: DELETE_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const saveShippingInfo = (shippingData) => async (dispatch) => {
  try {
    dispatch({ type: SHIPPING_INFO_REQUEST });
    const config = requestHeader();
    const { data } = await saveShippingInfoApi(shippingData, config);

    dispatch({
      type: SHIPPING_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPING_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};
