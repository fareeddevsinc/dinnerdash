import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getAllCartItemsApi = async (config) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cart`, config);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const addItemsToCartApi = async (id, quantity, config) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/cart/${id}`,
      { quantity },
      config
    );
    console.log(data);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const removeItemsFromCartApi = async (id, config) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/cart/${id}`, config);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCartApi = async (config) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/cart`, config);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const saveShippingInfoApi = async (userData, config) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/shipping`, userData, config);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};
