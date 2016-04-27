const RtmClient       = require("@slack/client").RtmClient;
const RTM_EVENTS      = require("@slack/client").RTM_EVENTS;
const CLIENT_EVENTS   = require("@slack/client").CLIENT_EVENTS;
const funcInputParser = require("../../parser/inputParser");

module.exports = function(strToken) {
  "use strict";

  const rtm = new RtmClient(strToken); // , { logLevel: "debug" }

  let arrChannels;
  let arrUsers;

  rtm.start();

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
    arrChannels = rtmStartData.channels;
    arrUsers = rtmStartData.users;
  });

  rtm.on(RTM_EVENTS.MESSAGE, function (objMessage) {
    console.log(objMessage.text);
    if (!objMessage.text) {
      return;
    }
    objMessage.channelName = arrChannels.find(c => c.id === objMessage.channel).name;
    objMessage.userName = arrUsers.find(u => u.id === objMessage.user).name;
    funcInputParser(objMessage.text, objMessage, funcBakeChannel(objMessage.channel, rtm));
  });

};

function funcBakeChannel(strChannel, rtm) {
  "use strict";
  return function(strMsg) {
    rtm.sendMessage(strMsg, strChannel);
  };
}
