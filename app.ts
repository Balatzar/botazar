const mongoose      = require("mongoose");
import slackService from "./src/services/slack/slack";

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/botazar");
console.log("Connected to mongo!");

console.log(process.env.SLACK_API_TOKEN)

slackService(process.env.SLACK_API_TOKEN);

