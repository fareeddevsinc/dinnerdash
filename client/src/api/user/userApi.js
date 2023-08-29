import apiService from "../apiService";

export const registerUserApi = async (userData) => {
  const data = await apiService.post("/register", userData);

  return data;
};

export const loginUserApi = async (email, password) => {
  const data = await apiService.post(`/login`, { email, password });

  return data;
};

export const loadUserApi = async () => {
  const data = await apiService.get(`/me`);
  return data;
};

export const logoutUserApi = async () => {
  const data = await apiService.get(`/logout`);
  return data;
};

export const updateProfileApi = async (userData) => {
  try {
    const { data } = await apiService.put(`/me/update`, userData);
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePasswordApi = async (passwords) => {
  const { data } = await apiService.put(`/password/update`, passwords);

  return { data };
};

export const forgotPasswordApi = async (email) => {
  const { data } = await apiService.post(`/password/forgot`, email);

  return { data };
};

export const resetPasswordApi = async (token, passwords) => {
  const { data } = await apiService.put(`/password/reset/${token}`, passwords);

  return { data };
};

export const getAllUsersApi = async () => {
  const { data } = await apiService.get(`/admin/users?role=admin`);

  return { data };
};

export const getUserDetailsApi = async (id) => {
  const { data } = await apiService.get(`/admin/user/${id}?role=admin`);

  return { data };
};

export const updateUserApi = async (id, userData) => {
  const { data } = await apiService.put(
    `/admin/user/${id}?role=admin`,
    userData
  );

  return { data };
};

export const deleteUserApi = async (id) => {
  const { data } = await apiService.delete(`/admin/user/${id}?role=admin`);

  return { data };
};
