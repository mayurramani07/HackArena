const axios = require("axios");
require("dotenv").config();

const CLIST_AUTH_HEADER = process.env.CLIST_AUTH_HEADER;
const CLIST_BASE_URL = "https://clist.by/api/v2/contest/";

async function fetchAllIndianHackathons() {
  const limit = 50; 
  try {
    const apiUrl = `${CLIST_BASE_URL}?limit=${limit}&upcoming=true&country=IN`;
    const response = await axios.get(apiUrl, {
      headers: { Authorization: CLIST_AUTH_HEADER }
    });

    const contests = response.data.objects || [];

    return contests.map(contest => ({
      name: contest.event,
      link: contest.href,
      date: contest.start,
      platform: contest.resource
    }));

  } catch (error) {
    console.error("Error fetching hackathons from Clist:", error.message);
    return [];
  }
}

module.exports = { fetchAllIndianHackathons };
