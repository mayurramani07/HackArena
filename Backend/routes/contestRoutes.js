const express = require('express');
const router = express.Router();
const { fetchLeetCode, fetchCodeforces } = require('../controllers/contestController');

router.get('/leetcode', fetchLeetCode);
router.get('/codeforces', fetchCodeforces);

module.exports = router;
