import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const updateOrderApi = async (id, order, config) => {
  const { data } = await axios.put(
    `${BASE_URL}/admin/order/${id}?role=admin`,
    order,
    config
  );

  return { data };
};

export const getAllOrdersApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/admin/orders?role=admin`, {
    withCredentials: true,
  });

  return { data };
};

export const myOrdersApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/orders/me`, {
    withCredentials: true,
  });

  return { data };
};

export const createOrderApi = async (order, config) => {
  const { data } = await axios.post(`${BASE_URL}/order/new`, order, config);
  return { data };
};

export const deleteOrderApi = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}?role=admin`, {
    withCredentials: true,
  });

  return { data };
};

export const getOrderDetailsApi = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/order/${id}`, {
    withCredentials: true,
  });

  return { data };
};
