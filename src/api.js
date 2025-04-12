import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// LOGIN
export const login = async (email, password) => {
  try {
    const response = await API.post('/login', {
      email,
      password,
    });

    console.log("Respuesta del login:", response.data); // <- Debug
    return response.data; // debe devolver { token: "..." }

  } catch (error) {
    console.error("Error al hacer login:", error.response?.data || error.message);
    throw error;
  }
};

// OBTENER USUARIOS
export const getUsers = async (token) => {
  const res = await API.get('/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// CREAR USUARIO
export const createUser = async (user, token) => {
  const res = await API.post('/users', user, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// ACTUALIZAR USUARIO
export const updateUser = async (id, user, token) => {
  const res = await API.put(`/users/${id}`, user, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// ELIMINAR USUARIO
export const deleteUser = async (id, token) => {
  const res = await API.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
