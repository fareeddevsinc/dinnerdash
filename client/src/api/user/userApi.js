import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const registerUserApi = async (userData, config) => {
  const data = await axios.post(`${BASE_URL}/register`, userData, config);

  return data;
};

export const loginUserApi = async (email, password, config) => {
  const data = await axios.post(
    `${BASE_URL}/login`,
    { email, password },
    config
  );

  return data;
};

export const loadUserApi = async (config) => {
  const data = await axios.get(`${BASE_URL}/me`, config);
  return data;
};

export const logoutUserApi = async (config) => {
  const data = await axios.get(`${BASE_URL}/logout`, config);
  return data;
};

export const updateProfileApi = async (userData, config) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/me/update`, userData, config);
    return { data };
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePasswordApi = async (passwords, config) => {
  const { data } = await axios.put(
    `${BASE_URL}/password/update`,
    passwords,
    config
  );

  return { data };
};

export const forgotPasswordApi = async (email, config) => {
  const { data } = await axios.post(
    `${BASE_URL}/password/forgot`,
    email,
    config
  );

  return { data };
};

export const resetPasswordApi = async (token, passwords, config) => {
  const { data } = await axios.post(
    `${BASE_URL}/password/reset/${token}`,
    passwords,
    config
  );

  return { data };
};

export const getAllUsersApi = async (config) => {
  const { data } = await axios.get(
    `${BASE_URL}/admin/users?role=admin`,
    config
  );

  return { data };
};

export const getUserDetailsApi = async (id, config) => {
  const { data } = await axios.get(
    `${BASE_URL}/admin/user/${id}?role=admin`,
    config
  );

  return { data };
};

export const updateUserApi = async (id, userData, config) => {
  const { data } = await axios.put(
    `${BASE_URL}/admin/user/${id}?role=admin`,
    userData,
    config
  );

  return { data };
};

export const deleteUserApi = async (id, config) => {
  const { data } = await axios.delete(
    `${BASE_URL}/admin/user/${id}?role=admin`,
    config
  );

  return { data };
};
