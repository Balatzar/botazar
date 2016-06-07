import mongoose     from "mongoose";
import slackService from "./src/services/slack/slack";
// import webService   from"./src/services/web/server";

mongoose.connect("mongodb://localhost/botazar");
slackService(process.env.SLACK_API_TOKEN);
//webService();
