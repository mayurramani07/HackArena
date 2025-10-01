import axios from "axios";

export const registerUser = async (email, password) => {
  const res = await axios.post(
    "http://localhost:7000/api/auth/register",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

