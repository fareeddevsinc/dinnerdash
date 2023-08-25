import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getAdminProductApi = async (config) => {
  const { data } = await axios.get(
    `${BASE_URL}/admin/products?role=admin`,
    config
  );
  return { data };
};

export const createProductApi = async (productData, config) => {
  const { data } = await axios.post(
    `${BASE_URL}/admin/product/new?role=admin`,
    productData,
    config
  );
  console.log(data);
  return { data };
};

export const updateProductApi = async (id, productData, config) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/admin/product/${id}?role=admin`,
      productData,
      config
    );

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProductApi = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/admin/product/${id}?role=admin`,
    {
      withCredentials: true,
    }
  );

  return { data };
};

export const getProductDetailsApi = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/product/${id}`, {
    withCredentials: true,
  });

  return { data };
};

export const newReviewApi = async (reviewData, config) => {
  const { data } = await axios.put(`${BASE_URL}/review`, reviewData, config);

  return { data };
};

export const getAllReviewsApi = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/reviews?id=${id}`, {
    withCredentials: true,
  });

  return { data };
};

export const deleteReviewsApi = async (reviewId, productId) => {
  const { data } = await axios.delete(
    `${BASE_URL}/reviews?id=${reviewId}&productId=${productId}`,
    { withCredentials: true }
  );

  return { data };
};
