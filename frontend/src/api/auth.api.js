import apiClient from './axios.config';

export const login = async (email, password) => {
  const response = await apiClient.post('/login', {
    email: email,
    password: password
  });
  return response.data;
};

export const register = async (fio, email, password) => {
  const response = await apiClient.post('/register', {
    fio: fio,
    email: email,
    password: password
  });
  return response.data;
};

export const refresh = async () => {
  const response = await apiClient.post('/refresh');
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post('/logout');
  return response.data;
};