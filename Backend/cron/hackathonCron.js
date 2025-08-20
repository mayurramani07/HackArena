const cron = require("node-cron");
const { saveHackathonsToDB } = require("../services/hackathonService");

cron.schedule("0 1 * * *", async () => {
  console.log("Running hackathon scrape cron job:", new Date().toLocaleString());

  try {
    const savedHackathons = await saveHackathonsToDB();
    console.log(`Saved ${savedHackathons.length} hackathons to DB`);
  } catch (err) {
    console.error("Error running hackathon cron job:", err);
  }
});
