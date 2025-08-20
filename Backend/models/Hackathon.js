const mongoose = require("mongoose");

const HackathonSchema = new mongoose.Schema({
  name: String,
  link: String,
  date: String,
  platform: String
});

const Hackathon = mongoose.model("Hackathon", HackathonSchema);
module.exports = Hackathon;
