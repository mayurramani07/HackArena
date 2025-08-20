const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const contestRoutes = require('./routes/contestRoutes');
const hackathonRoutes = require("./routes/hackathonRoutes");
require("./cron/contestCron");
require("./cron/hackathonCron");



dotenv.config();
connectDB();


const app = express();
app.use(express.json());


// app.use("/api/auth", authRoutes);
// app.use('/api/contests', contestRoutes);

app.use("/api/contests", contestRoutes);
app.use("/api/hackathons", hackathonRoutes);

app.get("/", (req,res) => {
    res.send("JAI SHREE RAM");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


