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