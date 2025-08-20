const axios = require("axios");
const Hackathon = require("../models/Hackathon.js");
require("dotenv").config();

const CLIST_AUTH_HEADER = process.env.CLIST_AUTH_HEADER;
const CLIST_BASE_URL = "https://clist.by/api/v2/contest/";

async function fetchAllIndianHackathons() {
  const allHackathons = [];
  const limit = 50;
  let offset = 0;  
  let hasMoreData = true;

  try {
    while (hasMoreData) {
      const apiUrl = `${CLIST_BASE_URL}?limit=${limit}&offset=${offset}&upcoming=true&country=IN`;
      const response = await axios.get(apiUrl, {
        headers: { Authorization: CLIST_AUTH_HEADER }
      });

      const contests = response.data.objects || [];

      if (contests.length === 0) {
        hasMoreData = false;
        break;
      }
      const hackathonsBatch = contests.map(contest => ({name: contest.event, link: contest.href, date: contest.start, platform: contest.resource}));
      allHackathons.push(...hackathonsBatch);
      offset += limit;
    }

    return allHackathons;

  } catch (error) {
    console.error("Error fetching hackathons from Clist:", error.message);
    return [];
  }
}
async function saveHackathonsToDB() {
  try {
    const hackathons = await fetchAllIndianHackathons();

    if (hackathons.length === 0) {
      console.log("No hackathons found to save.");
      return [];
    }
    await Hackathon.deleteMany({});
    const savedHackathons = await Hackathon.insertMany(hackathons);
    console.log(`Saved ${savedHackathons.length} hackathons to database.`);

    return savedHackathons;

  } catch (error) {
    console.error("Error saving hackathons to database:", error.message);
    return [];
  }
}

module.exports = {fetchAllIndianHackathons,saveHackathonsToDB};
