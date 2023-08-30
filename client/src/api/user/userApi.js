import apiService from "../apiService";

export const registerUserApi = async (userData) => {
  try {
    const data = await apiService.post("/register", userData);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUserApi = async (email, password) => {
  try {
    const data = await apiService.post(`/login`, { email, password });

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const loadUserApi = async () => {
  try {
    const data = await apiService.get(`/me`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const logoutUserApi = async () => {
  try {
    const data = await apiService.get(`/logout`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
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
  try {
    const { data } = await apiService.put(`/password/update`, passwords);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const forgotPasswordApi = async (email) => {
  try {
    const { data } = await apiService.post(`/password/forgot`, email);
    return { data };
  } catch (error) {
    console.error(error);
  }
};

export const resetPasswordApi = async (token, passwords) => {
  try {
    const { data } = await apiService.put(
      `/password/reset/${token}`,
      passwords
    );
    return { data };
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsersApi = async () => {
  try {
    const { data } = await apiService.get(`/admin/users?role=admin`);
    return { data };
  } catch (error) {
    console.error(error);
  }
};

export const getUserDetailsApi = async (id) => {
  try {
    const { data } = await apiService.get(`/admin/user/${id}?role=admin`);

    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUserApi = async (id, userData) => {
  try {
    const { data } = await apiService.put(
      `/admin/user/${id}?role=admin`,
      userData
    );
    return { data };
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserApi = async (id) => {
  try {
    const { data } = await apiService.delete(`/admin/user/${id}?role=admin`);
    return { data };
  } catch (error) {
    console.error(error);
  }
};
