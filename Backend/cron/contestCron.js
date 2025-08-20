const cron = require("node-cron");
const { refreshContests } = require("../services/contestService");

cron.schedule("0 */6 * * *", () => {
  console.log("Cron Job: refreshing contests...");
  refreshContests();
});
