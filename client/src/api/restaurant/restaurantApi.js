import apiService from "../apiService";

export const getAllRestaurantsApi = async () => {
  try {
    const { data } = await apiService.get(`/restaurants`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const getRestaurantDetailsApi = async (id) => {
  try {
    const { data } = await apiService.get(`/restaurant/${id}`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const addRestaurantApi = async (restaurantData) => {
  try {
    const { data } = await apiService.post(
      `/restaurant/new?role=admin`,
      restaurantData
    );
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRestaurantApi = async (id) => {
  try {
    const { data } = await apiService.delete(`/restaurant/${id}?role=admin`);
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRestaurantApi = async (id, restaurantData) => {
  try {
    const { data } = await apiService.put(
      `/restaurant/${id}?role=admin`,
      restaurantData
    );
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};
