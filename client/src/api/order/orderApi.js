import apiService from "../apiService";

export const updateOrderApi = async (id, order) => {
  try {
    const { data } = await apiService.put(
      `/admin/order/${id}?role=admin`,
      order
    );

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllOrdersApi = async () => {
  const { data } = await apiService.get(`/admin/orders?role=admin`);

  return { data };
};

export const myOrdersApi = async () => {
  try {
    const { data } = await apiService.get(`/orders/me`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const createOrderApi = async (order) => {
  try {
    const { data } = await apiService.post(`/order/new`, order);
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteOrderApi = async (id) => {
  try {
    const { data } = await apiService.delete(`/admin/order/${id}?role=admin`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrderDetailsApi = async (id) => {
  const { data } = await apiService.get(`/order/${id}`);

  return { data };
};
