const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true }, 
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  url: { type: String, required: true }
});

module.exports = mongoose.model("Contest", contestSchema);
