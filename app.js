"use strict";
var mongoose = require("mongoose");
var slack_1 = require("./src/services/slack/slack");
var webService = require("./src/services/web/server");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/botazar");
console.log("Connected to mongo!");
slack_1.default(process.env.SLACK_API_TOKEN);
webService();
