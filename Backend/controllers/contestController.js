const Reminder = require("../models/Reminder");
const { fetchAllContests } = require("../services/contestService");

exports.getAllContests = async (req, res) => {
  try {
    const contests = await fetchAllContests();

    let reminders = [];
    if (req.user?.email) {
      reminders = await Reminder.find({ email: req.user.email });
    }

    const reminderMap = new Set(reminders.map(r => r.contestId));

    const contestsWithReminders = contests.map(c => ({
      ...c,
      reminder: reminderMap.has(c.id || c._id || c.url), // ✅ match contestId
    }));

    res.json(contestsWithReminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch contests" });
  }
};
