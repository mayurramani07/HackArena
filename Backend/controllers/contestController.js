const { fetchAllContests } = require("../services/contestService");

exports.getAllContests = async (req, res) => {
  try {
    const contests = await fetchAllContests();
    res.json(contests); // 👈 directly scrape karke bhej do
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch contests" });
  }
};
