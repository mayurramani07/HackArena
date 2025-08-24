const express = require("express");
const { fetchAllIndianHackathons } = require("../services/hackathonService.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hackathons = await fetchAllIndianHackathons();
    res.json(hackathons);
  } catch (error) {
    console.error("Error in /hackathons route:", error.message);
    res.status(500).json({ error: "Failed to fetch hackathons" });
  }
});

module.exports = router;
