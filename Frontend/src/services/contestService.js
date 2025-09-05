import { v4 as uuidv4 } from "uuid";

export const fetchContests = async () => {
  try {
    const res = await fetch("http://localhost:7000/api/contests", {
      credentials: "include", 
    });
    if (!res.ok) throw new Error("Failed to fetch contests");
    const data = await res.json();

    return data.map((c) => ({
      ...c,
      bookmarked: false,
      id: uuidv4(),
    }));
  } catch (error) {
    console.error("Error fetching contests:", error);
    return [];
  }
};

export const checkAuth = async () => {
  try {
    const res = await fetch("http://localhost:7000/api/auth/check", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Auth check failed");
    const data = await res.json();
    return data.loggedIn || false;
  } catch (error) {
    console.error("Error checking auth:", error);
    return false;
  }
};
