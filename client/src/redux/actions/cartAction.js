import {
  addItemsToCartApi,
  getAllCartItemsApi,
  removeItemsFromCartApi,
  deleteCartApi,
} from "../../api/cart/cartApi";
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
} from "../constants/cartConstants";

export const getCart = (alert) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const { data } = await getAllCartItemsApi(alert);

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

export const addItemsToCart = (id, quantity, alert) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CART_ITEM_REQUEST });

    const { data } = await addItemsToCartApi(id, quantity, alert);

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
export const removeItemsFromCart = (id, alert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_ITEM_REQUEST });

    const { data } = await removeItemsFromCartApi(id, alert);

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

export const deleteCart = (alert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_REQUEST });

    const { data } = await deleteCartApi(alert);

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
