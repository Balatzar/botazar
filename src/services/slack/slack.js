const inputParser = require("../../parser/inputParser");

module.exports = function() {
  "use strict";
  const RtmClient = require("@slack/client").RtmClient;
  const RTM_EVENTS = require("@slack/client").RTM_EVENTS;

  const token = process.env.SLACK_API_TOKEN || "";

  const rtm = new RtmClient(token); // , { logLevel: "debug" }

  rtm.start();

  rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    console.log(message.text);
    if (!message.text) {
      return;
    }
    if (message.text.indexOf("baltabot") === 0 ||
        message.text.indexOf("botazar") === 0 ||
        message.text.indexOf("<@U1082RRH8>:") === 0) {
      let input = message.text.split(" ");
      input.shift();
      try {
        rtm.sendMessage(inputParser(input.join(" "), { user: message.user }), message.channel, function messageSent() {
          // optionally, you can supply a callback to execute once the message has been sent
        });
      } catch (e) {
        console.log(e);
      }
    }
  });

};
