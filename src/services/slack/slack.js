const inputParser = require("../../parser/inputParser");
const RtmClient   = require("@slack/client").RtmClient;
const RTM_EVENTS  = require("@slack/client").RTM_EVENTS;

module.exports = function() {
  "use strict";

  const token = process.env.SLACK_API_TOKEN;

  const rtm = new RtmClient(token); // , { logLevel: "debug" }

  rtm.start();

  rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    console.log(message.text);
    if (!message.text) {
      return;
    }
    inputParser(message.text, bakeChannel(message.channel, rtm));
  });

};

function bakeChannel(channel, rtm) {
  return function(msg) {
    rtm.sendMessage(msg, channel);
  }
}