const RtmClient         = require("@slack/client").RtmClient;
const RTM_EVENTS        = require("@slack/client").RTM_EVENTS;
const CLIENT_EVENTS     = require("@slack/client").CLIENT_EVENTS;
const MemoryDataStore   = require("@slack/client").MemoryDataStore;
const funcInputParser   = require("../../parser/inputParser");
const apps              = require("../../parser/jsonParser")();
const init              = require("./modules/init");

module.exports = function(strToken) {
  "use strict";

  const rtm = new RtmClient(strToken, {
    dataStore: new MemoryDataStore(),
  }); // , { logLevel: "debug" }

  rtm.start();

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
    init(rtmStartData);
  });

  rtm.on(RTM_EVENTS.MESSAGE, function (objMessage) {
    console.log(objMessage.text);
    if (!objMessage.text) {
      return;
    }
    console.log(objMessage.channel)
    objMessage.userName = rtm.dataStore.getUserById(objMessage.user) ? rtm.dataStore.getUserById(objMessage.user).name : "none";
    objMessage.team = rtm.dataStore.getTeamById(rtm.activeTeamId).name;
    objMessage.channelName = rtm.dataStore.getChannelGroupOrDMById(objMessage.channel).name;
    funcInputParser(objMessage.text, objMessage, funcBakeChannel(objMessage.channel, rtm));
  });

  apps.forEach(a => {
    if (a.emitter) {
      require("../../apps/" + a.strName.toLowerCase() + "/emitter/emitter.js")(function(strMsg, strChannel) {
        rtm.sendMessage(strMsg, strChannel);
      });
    }
  });

};

function funcBakeChannel(strChannel, rtm) {
  "use strict";
  return function(strMsg) {
    rtm.sendMessage(strMsg, strChannel);
  };
}
