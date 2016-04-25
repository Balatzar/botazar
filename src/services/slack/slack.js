const RtmClient   = require("@slack/client").RtmClient;
const RTM_EVENTS  = require("@slack/client").RTM_EVENTS;
const funcInputParser = require("../../parser/inputParser");

module.exports = function(strToken) {
  "use strict";

  const rtm = new RtmClient(strToken); // , { logLevel: "debug" }

  rtm.start();

  rtm.on(RTM_EVENTS.MESSAGE, function (objMessage) {
    console.log(objMessage.text);
    if (!objMessage.text) {
      return;
    }
    funcInputParser(objMessage.text, funcBakeChannel(objMessage.channel, rtm));
  });

};

function funcBakeChannel(strChannel, rtm) {
  return function(msg) {
    rtm.sendMessage(strMsg, strChannel);
  }
}