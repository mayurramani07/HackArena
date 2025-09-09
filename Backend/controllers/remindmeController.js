const schedule = require("node-schedule");
const transporter = require("../utils/mailer");
const Reminder = require("../models/Reminder");

const sendReminder = async (req, res) => {
  const { name, email, contestId, contestTitle, contestStartTime } = req.body;

  if (!contestId || !email || !contestTitle || !contestStartTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const contestDate = new Date(contestStartTime);

    if (isNaN(contestDate.getTime())) {
      return res.status(400).json({ error: "Invalid contest start time" });
    }
    const existing = await Reminder.findOne({ email, contestId });
    if (existing) {
      return res.status(200).json({ message: "Reminder already set" });
    }

    const newReminder = new Reminder({
      name,
      email,
      contestId,
      contestTitle,
      contestStartTime: contestDate,
    });
    await newReminder.save();

    const oneHourBefore = new Date(contestDate.getTime() - 60 * 60 * 1000);
    const halfHourBefore = new Date(contestDate.getTime() - 30 * 60 * 1000);

    const scheduleEmail = (time, label) => {
      if (time > new Date()) {
        schedule.scheduleJob(time, async () => {
          try {
            await transporter.sendMail({
              from: "no-reply@hackarena.com",
              to: email,
              subject: `Reminder: ${contestTitle} (${label})`,
              html: `
                <h2>HackArena Contest Reminder</h2>
                <p>Hi ${name || "User"},</p>
                <p>The contest <b>"${contestTitle}"</b> is starting soon!</p>
                <p><b>Start Time:</b> ${contestDate.toLocaleString()}</p>
                <p>This is your <b>${label}</b> reminder 🚀</p>
                <br/>
                <p style="font-size: 12px; color: #666;">- Team HackArena</p>
              `,
            });
            console.log(`Reminder (${label}) sent to ${email}`);
          } catch (err) {
            console.error("Error sending scheduled mail:", err);
          }
        });
      }
    };

    scheduleEmail(oneHourBefore, "1 hour before");
    scheduleEmail(halfHourBefore, "30 minutes before");

    res.status(201).json({ message: `Reminder set & scheduled for ${contestTitle}` });
  } catch (error) {
    console.error("Reminder error:", error);
    res.status(500).json({ error: "Failed to set reminder" });
  }
};

const checkReminder = async (req, res) => {
  try {
    const { email, contestId } = req.params;
    const reminder = await Reminder.findOne({ email, contestId });
    res.json({ exists: !!reminder });
  } catch (error) {
    console.error("Check reminder error:", error);
    res.status(500).json({ error: "Failed to check reminder" });
  }
};

module.exports = { sendReminder, checkReminder };
