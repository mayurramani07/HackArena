import axios from "axios";

export const registerUser = async (email, password) => {
  const res = await axios.post(
    "http://localhost:7000/api/auth/register",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(
    "http://localhost:7000/api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

export const checkAuth = async () => {
  const res = await axios.get("http://localhost:7000/api/auth/check", {
    withCredentials: true,
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    "http://localhost:7000/api/auth/logout",
    {},
    { withCredentials: true }
  );
  return res.data;
};