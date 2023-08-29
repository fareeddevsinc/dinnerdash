import apiService from "../apiService";

export const getAdminProductApi = async () => {
  const { data } = await apiService.get(`/admin/products?role=admin`);
  return { data };
};

export const createProductApi = async (productData) => {
  const { data } = await apiService.post(
    `/admin/product/new?role=admin`,
    productData
  );
  console.log(data);
  return { data };
};

export const updateProductApi = async (id, productData) => {
  try {
    const { data } = await apiService.put(
      `/admin/product/${id}?role=admin`,
      productData
    );

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProductApi = async (id) => {
  const { data } = await apiService.delete(`/admin/product/${id}?role=admin`);

  return { data };
};

export const getProductDetailsApi = async (id) => {
  const { data } = await apiService.get(`/product/${id}`);

  return { data };
};

export const newReviewApi = async (reviewData) => {
  const { data } = await apiService.put(`/review`, reviewData);

  return { data };
};

export const getAllReviewsApi = async (id) => {
  const { data } = await apiService.get(`/reviews?id=${id}`);

  return { data };
};

export const deleteReviewsApi = async (reviewId, productId) => {
  const { data } = await apiService.delete(
    `/reviews?id=${reviewId}&productId=${productId}`
  );

  return { data };
};
