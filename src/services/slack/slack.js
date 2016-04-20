const inputParser = require("../../parser/inputParser");

// console.log(inputParser("fdb -h"));
// console.log(inputParser("feedback -help"));

const RtmClient = require("@slack/client").RtmClient;
const RTM_EVENTS = require("@slack/client").RTM_EVENTS;

const token = process.env.SLACK_API_TOKEN || "";

const rtm = new RtmClient(token, { logLevel: "debug" }); // { logLevel: "debug" }

rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  "use strict";
  console.log(message.text);
  if (message.text.indexOf("baltabot") === 0 ||
      message.text.indexOf("botazar") === 0 ||
      message.text.indexOf("<@U1082RRH8>:") === 0) {
    let input = message.text.split(" ");
    input.shift();
    try {
      rtm.sendMessage(inputParser(input.join(" ")), message.channel, function messageSent() {
        // optionally, you can supply a callback to execute once the message has been sent
      });
    } catch (e) {
      console.log(e);
    }
  }
});
