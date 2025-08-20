const { saveHackathonsToDB } = require("../services/hackathonService.js");
const Hackathon = require("../models/Hackathon.js");

const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ date: 1 });
    res.json(hackathons);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch hackathons" });
  }
};

const refreshHackathons = async (req, res) => {
  try {
    const hackathons = await saveHackathonsToDB();
    res.json({ message: "Hackathons refreshed successfully", hackathons });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to refresh hackathons" });
  }
};

module.exports = { getAllHackathons, refreshHackathons };
