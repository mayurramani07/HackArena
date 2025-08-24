const { fetchAllIndianHackathons } = require("../services/hackathonService.js");

const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await fetchAllIndianHackathons();
    res.json(hackathons);
  } catch (err) {
    console.error("Error fetching hackathons:", err.message);
    res.status(500).json({ message: "Failed to fetch hackathons" });
  }
};

module.exports = { getAllHackathons };
