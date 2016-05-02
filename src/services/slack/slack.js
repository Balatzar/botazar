const RtmClient         = require("@slack/client").RtmClient;
const RTM_EVENTS        = require("@slack/client").RTM_EVENTS;
const CLIENT_EVENTS     = require("@slack/client").CLIENT_EVENTS;
const MemoryDataStore   = require("@slack/client").MemoryDataStore;
const funcInputParser   = require("../../parser/inputParser");

module.exports = function(strToken) {
  "use strict";

  const rtm = new RtmClient(strToken, {
    logLevel: "debug",
    dataStore: new MemoryDataStore(),
  }); // , { logLevel: "debug" }

  rtm.start();

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
  });

  rtm.on(RTM_EVENTS.MESSAGE, function (objMessage) {
    console.log(objMessage.text);
    if (!objMessage.text) {
      return;
    }
    objMessage.userName = rtm.dataStore.getUserById(objMessage.user) ? rtm.dataStore.getUserById(objMessage.user).name : "none";
    objMessage.team = rtm.dataStore.getTeamById(rtm.activeTeamId).name;
    objMessage.channelName = rtm.dataStore.getChannelGroupOrDMById(objMessage.channel).name;
    funcInputParser(objMessage.text, objMessage, funcBakeChannel(objMessage.channel, rtm));
  });

};

function funcBakeChannel(strChannel, rtm) {
  "use strict";
  return function(strMsg) {
    rtm.sendMessage(strMsg, strChannel);
  };
}
