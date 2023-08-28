import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const updateOrderApi = async (id, order, config) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/admin/order/${id}?role=admin`,
      order,
      config
    );

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllOrdersApi = async (config) => {
  const { data } = await axios.get(
    `${BASE_URL}/admin/orders?role=admin`,
    config
  );

  return { data };
};

export const myOrdersApi = async (config) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders/me`, config);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const createOrderApi = async (order, config) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/order/new`, order, config);
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteOrderApi = async (id, config) => {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/admin/order/${id}?role=admin`,
      config
    );

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderDetailsApi = async (id, config) => {
  const { data } = await axios.get(`${BASE_URL}/order/${id}`, config);

  return { data };
};
