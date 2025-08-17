const express = require('express');
const router = express.Router();
const { fetchLeetCode, fetchCodeforces, fetchAtCoder } = require('../controllers/contestController');

router.get('/leetcode', fetchLeetCode);
router.get('/codeforces', fetchCodeforces);
router.get('/atcoder', fetchAtCoder);

module.exports = router;
