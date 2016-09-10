import * as mongoose from "mongoose";
import slackService from "./services/slack/slack";

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/botazar");
console.log("Connected to mongo!");

slackService(process.env.SLACK_API_TOKEN);
