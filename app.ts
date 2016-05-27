const mongoose      = require("mongoose");
import slackService from "./src/services/slack/slack";
const webService    = require("./src/services/web/server");

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/botazar");
console.log("Connected to mongo!");

slackService(process.env.SLACK_API_TOKEN);
webService();
