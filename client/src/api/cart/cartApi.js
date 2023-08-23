import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const addItemsToCartApi = async (id, quantity) => {
  const { data } = await axios.get(`${BASE_URL}/product/${id}`, quantity);

  return { data };
};

export const removeItemsFromCartApi = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/product/${id}`);

  return { data };
};

export const saveShippingInfoApi = async (id, userData) => {
  const { data } = await axios.post(`${BASE_URL}/shipping/${id}`, userData);

  return { data };
};
