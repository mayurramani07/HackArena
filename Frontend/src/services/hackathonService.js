import axios from "axios";
const API_URL = "http://localhost:7000/api/hackathons";
export const fetchHackathons = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching hackathons:", error.message);
    return [];
  }
};
