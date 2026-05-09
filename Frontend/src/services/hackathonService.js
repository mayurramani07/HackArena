import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const API_URL = `${API}/api/hackathons`;

export const fetchHackathons = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching hackathons:", error.message);
    return [];
  }
};