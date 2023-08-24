import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getAllCartItemsApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/cart`, {
    withCredentials: true,
  });

  return { data };
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

export const removeItemsFromCartApi = async (id, quantity, config) => {
  const { data } = await axios.delete(
    `${BASE_URL}/cart/${id}`,
    quantity,
    config
  );

  return { data };
};

export const deleteCartApi = async () => {
  const { data } = await axios.delete(`${BASE_URL}/cart`, {
    withCredentials: true,
  });

  return { data };
};

export const saveShippingInfoApi = async (id, userData) => {
  const { data } = await axios.post(`${BASE_URL}/shipping/${id}`, userData);

  return { data };
};
