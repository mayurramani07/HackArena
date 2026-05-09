import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registerUser = async (email, password) => {
  const res = await axios.post(
    `${API}/api/auth/register`,
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(
    `${API}/api/auth/login`,
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

export const checkAuth = async () => {
  const res = await axios.get(`${API}/api/auth/check`, {
    withCredentials: true,
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${API}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
};