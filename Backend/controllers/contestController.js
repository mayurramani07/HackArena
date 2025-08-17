const axios = require('axios');
const cheerio = require('cheerio');
const formatDate = require('../utils/formatDate.js');

exports.fetchLeetCode = async (req, res) => {
    try {
        const response = await axios.post('https://leetcode.com/graphql', {
            query: `{ topTwoContests { title startTime duration cardImg } }`
        });

        const contests = response.data.data.topTwoContests.map(contest => {
            const contestSlug = contest.title.toLowerCase().replace(/ /g, "-");
            return {
                title: contest.title,
                startTime: formatDate(contest.startTime),
                duration: contest.duration / 60 + " minutes",
                cardImg: contest.cardImg,
                url: `https://leetcode.com/contest/${contestSlug}`
            };
        });

        res.json(contests);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch LeetCode contests." });
    }
};

exports.fetchCodeforces = async (req, res) => {
    try {
        const response = await axios.get('https://codeforces.com/api/contest.list');
        const contests = response.data.result
            .filter(contest => contest.phase === 'BEFORE')
            .map(contest => ({
                title: contest.name,
                startTime: formatDate(contest.startTimeSeconds),
                duration: contest.durationSeconds / 60 + " minutes",
                url: `https://codeforces.com/contest/${contest.id}`
            }));

        res.json(contests);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Codeforces contests." });
    }
};

exports.fetchAtCoder = async (req, res) => {
    try {
        const response = await axios.get('https://atcoder.jp/contests/');
        const $ = cheerio.load(response.data);

        let contests = [];
        $('.table tbody tr').each((index, element) => {
            const titleElement = $(element).find('td a');
            const title = titleElement.text().trim();
            const url = "https://atcoder.jp" + titleElement.attr('href');
            const startTime = $(element).find('td').eq(0).text().trim();

            if (title && startTime) {
                contests.push({ title, startTime, url });
            }
        });

        res.json(contests);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch AtCoder contests." });
    }
};
