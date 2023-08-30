import apiService from "../apiService";

export const getAllCartItemsApi = async () => {
  try {
    const { data } = await apiService.get(`/cart`);
    console.log(data);
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const addItemsToCartApi = async (id, quantity, alert) => {
  try {
    const { data } = await apiService.post(`/cart/${id}`, { quantity });
    if (data) {
      alert.success("Data Added To Cart Successfully");
    }

    return { data };
  } catch (error) {
    console.log(error.message);
    alert.error("Item Cannot Be Added From A Different Restaurant");
  }
};

export const removeItemsFromCartApi = async (id) => {
  try {
    const { data } = await apiService.delete(`/cart/${id}`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCartApi = async () => {
  try {
    const { data } = await apiService.delete(`/cart`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const saveShippingInfoApi = async (userData) => {
  try {
    const { data } = await apiService.post(`/shipping`, userData);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};
