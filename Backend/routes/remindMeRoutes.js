const express = require("express");
const { sendReminder, checkReminder } = require("../controllers/remindmeController.js");

const router = express.Router();

router.post("/remind-me", sendReminder);
router.get("/:email/:contestId", checkReminder);

module.exports = router;
