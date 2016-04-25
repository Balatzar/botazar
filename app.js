const mongoose      = require("mongoose");
const slackService  = require("./src/services/slack/slack");

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/botazar");
console.log("Connected to mongo!");

slackService();
