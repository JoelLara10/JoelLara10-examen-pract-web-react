import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (email, password) => {
  const res = await API.post('/login', { email, password });
  return res.data;
};

export const getUsers = async (token) => {
  const res = await API.get('/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createUser = async (user, token) => {
  const res = await API.post('/users', user, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateUser = async (id, user, token) => {
  const res = await API.put(`/users/${id}`, user, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteUser = async (id, token) => {
  const res = await API.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
