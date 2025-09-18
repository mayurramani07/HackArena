const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const contestRoutes = require('./routes/contestRoutes');
const hackathonRoutes = require("./routes/hackathonRoutes");
const cookieParser = require("cookie-parser");
const feedbackRoutes = require("./routes/feedbackRoutes");
const remindMeRoutes = require("./routes/remindMeRoutes");
// const hackathonReminderRoutes = require("./routes/hackathonReminderRoutes");
const cors = require("cors");
require("./cron/contestCron");
require("./cron/hackathonCron");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://deploySoon.com" 
        : "http://localhost:5173",
    credentials: true, 
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api", feedbackRoutes);
app.use("/api/reminders", remindMeRoutes);
// app.use("/api/hackathon-reminders", hackathonReminderRoutes);

app.get("/", (req, res) => {
  res.send("JAI SHREE RAM");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
