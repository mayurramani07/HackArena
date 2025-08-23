const express = require("express");
const { getAllContests } = require("../controllers/contestController");

const router = express.Router();

router.get("/", getAllContests);       
// router.post("/refresh", updateContests); 

module.exports = router;
