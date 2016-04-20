const mongoose      = require("mongoose");
const slackService  = require("./src/services/slack/slack");

mongoose.connect("mongodb://localhost/botazar");
console.log("Connected to mongo!");

slackService();
