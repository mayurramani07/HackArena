const axios = require("axios");
const cheerio = require("cheerio");
const Contest = require("../models/Contest");
const formatDate = require("../utils/formatDate.js");


async function fetchLeetCode() {
  try {
    const response = await axios.post("https://leetcode.com/graphql", {
      query: `{ topTwoContests { title startTime duration cardImg } }`
    });

    return response.data.data.topTwoContests.map(contest => ({
      title: contest.title,
      platform: "LeetCode",
      startTime: new Date(contest.startTime * 1000),
      endTime: new Date(contest.startTime * 1000 + contest.duration * 1000),
      url: `https://leetcode.com/contest/${contest.title.toLowerCase().replace(/ /g, "-")}`
    }));
  } catch (err) {
    console.error("LeetCode fetch error:", err.message);
    return [];
  }
}

async function fetchCodeforces() {
  try {
    const { data } = await axios.get("https://codeforces.com/api/contest.list");
    return data.result
      .filter(c => c.phase === "BEFORE")
      .map(c => ({
        title: c.name,
        platform: "Codeforces",
        startTime: new Date(c.startTimeSeconds * 1000),
        endTime: new Date(c.startTimeSeconds * 1000 + c.durationSeconds * 1000),
        url: `https://codeforces.com/contest/${c.id}`
      }));
  } catch (err) {
    console.error("Codeforces fetch error:", err.message);
    return [];
  }
}

async function fetchAtCoder() {
  try {
    const { data } = await axios.get("https://atcoder.jp/contests/");
    const $ = cheerio.load(data);

    let contests = [];
    $(".table tbody tr").each((i, el) => {
      const titleElement = $(el).find("td a");
      const title = titleElement.text().trim();
      const url = "https://atcoder.jp" + titleElement.attr("href");
      const startTimeStr = $(el).find("td").eq(0).text().trim();

      let startTime = new Date(startTimeStr.replace(/\s+/g, 'T')); 
      if (isNaN(startTime)) return;

      contests.push({
        title,
        platform: "AtCoder",
        startTime,
        endTime: new Date(startTime.getTime() + 2*60*60*1000), 
        url
      });
    });
    return contests;
  } catch (err) {
    console.error("AtCoder fetch error:", err.message);
    return [];
  }
}

async function refreshContests() {
  const lc = await fetchLeetCode();
  const cf = await fetchCodeforces();
  const ac = await fetchAtCoder();

  const all = [...lc, ...cf, ...ac];

  await Contest.deleteMany({});
  await Contest.insertMany(all);

  console.log("Contests refreshed:", all.length);
  return all;
}

module.exports = { refreshContests };
