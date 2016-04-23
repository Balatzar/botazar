const inputParser = require("../../parser/inputParser");
const RtmClient   = require("@slack/client").RtmClient;
const RTM_EVENTS  = require("@slack/client").RTM_EVENTS;

const botNames    = [ "baltabot", "botazar", "botazar:",
                      "<@U1082RRH8>:", "balthabot", "petikon" ];

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
    let input = message.text.split(" ");
    if (botNames.indexOf(input[0])) {
      input.shift();
    }
    inputParser(input.join(" "), message, function(msg, channel) {
      rtm.sendMessage(msg, channel);
    });
  });

};
