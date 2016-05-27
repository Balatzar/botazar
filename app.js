"use strict";
const mongoose = require("mongoose");
const slack_1 = require("./src/services/slack/slack");
const webService = require("./src/services/web/server");
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/botazar");
console.log("Connected to mongo!");
slack_1.default(process.env.SLACK_API_TOKEN);
webService();
