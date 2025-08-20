const Contest = require("../models/Contest");
const { refreshContests } = require("../services/contestService");


exports.getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().sort({ startTime: 1 });
    res.json(contests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contests" });
  }
};

exports.updateContests = async (req, res) => {
  try {
    const contests = await refreshContests();
    res.json({ message: "Contests refreshed", count: contests.length });
  } catch (err) {
    console.error("Error in refreshContests:", err); 
    res.status(500).json({ error: "Failed to refresh contests." });
  }
};
