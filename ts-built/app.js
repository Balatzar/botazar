"use strict";
var mongoose = require("mongoose");
var slack_1 = require("./src/services/slack/slack");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/botazar");
console.log("Connected to mongo!");
console.log(process.env.SLACK_API_TOKEN);
slack_1.default(process.env.SLACK_API_TOKEN);
