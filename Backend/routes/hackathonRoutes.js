const express = require("express");
const { getAllHackathons, refreshHackathons } = require("../controllers/hackathonController.js");

const router = express.Router();

router.get("/", getAllHackathons);
router.post("/refresh", refreshHackathons);

module.exports = router;
