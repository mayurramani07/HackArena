const axios = require("axios");
const cheerio = require("cheerio");
const Contest = require("../models/Contest");

async function fetchLeetCode() {
  try {
    const response = await axios.post("https://leetcode.com/graphql", {
      query: `{ 
        allContests { title startTime duration } 
      }`,
    });

    return response.data.data.allContests
      .slice(0, 5) 
      .map((contest) => ({
        title: contest.title,
        platform: "LeetCode",
        startTime: new Date(contest.startTime * 1000),
        endTime: new Date(
          contest.startTime * 1000 + contest.duration * 1000
        ),
        url: `https://leetcode.com/contest/${contest.title
          .toLowerCase()
          .replace(/ /g, "-")}`,
      }));
  } catch (err) {
    console.error("LeetCode fetch error:", err.message);
    return [];
  }
}

async function fetchCodeforces() {
  try {
    const { data } = await axios.get(
      "https://codeforces.com/api/contest.list"
    );

    return data.result
      .slice(0, 5) 
      .map((c) => ({
        title: c.name,
        platform: "Codeforces",
        startTime: new Date(c.startTimeSeconds * 1000),
        endTime: new Date(
          c.startTimeSeconds * 1000 + c.durationSeconds * 1000
        ),
        url: `https://codeforces.com/contest/${c.id}`,
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
      if (contests.length >= 5) return false; 
      const titleElement = $(el).find("td").eq(1).find("a");
      let title = titleElement.text().trim();

      title = title
        .replace(/^[\s\d:+-]+/, "")
        .replace(/\[.*?\]\s*/, "")
        .replace(/\d{4}-\d{2}-\d{2}/g, "") 
        .replace(/\d{1,2}:\d{2}/g, "")   
        .trim();

      const url = "https://atcoder.jp" + titleElement.attr("href");


      const startTimeStr = $(el).find("td").eq(0).text().trim();
      let startTime = new Date(startTimeStr.replace(/\s+/g, "T"));
      if (isNaN(startTime)) return;

      const startDateOnly = startTime.toISOString().split("T")[0];

      const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

      contests.push({
        title,
        platform: "AtCoder",
        startTime: startDateOnly,
        endTime,
        url,
      });
    });

    return contests;
  } catch (err) {
    console.error("AtCoder fetch error:", err.message);
    return [];
  }
}

async function fetchAllContests() {
  const lc = await fetchLeetCode();
  const cf = await fetchCodeforces();
  const ac = await fetchAtCoder();

  const all = [...lc, ...cf, ...ac];

  console.log("Contests refreshed:", all.length);
  return all;
}

module.exports = { fetchAllContests };

