import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getAllRestaurantsApi = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/restaurants`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const getRestaurantDetailsApi = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/restaurant/${id}`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const addRestaurantApi = async (restaurantData, config) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/restaurant/new?role=admin`,
      restaurantData,
      config
    );
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};
