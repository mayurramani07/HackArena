const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  contestId: { type: String, required: true }, 
  contestTitle: { type: String, required: true },
  contestStartTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

reminderSchema.index({ email: 1, contestId: 1 }, { unique: true });

module.exports = mongoose.model("Reminder", reminderSchema);
