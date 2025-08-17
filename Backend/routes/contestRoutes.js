const express = require('express');
const router = express.Router();
const { fetchLeetCode } = require('../controllers/contestController');

router.get('/leetcode', fetchLeetCode);

module.exports = router;
