import slackClient   from "@slack/client";
// import inputParser   from "../../parser/inputParser";
// import jsonParser    from "../../parser/jsonParser";
import initModule    from "./modules/initSlack";
import bakeChannel   from "./modules/bakeChannel";

const RtmClient         = slackClient.RtmClient;
const RTM_EVENTS        = slackClient.RTM_EVENTS;
const CLIENT_EVENTS     = slackClient.CLIENT_EVENTS;
const MemoryDataStore   = slackClient.MemoryDataStore;
// const apps              = jsonParser();

export default function(strToken) {

  const rtm = new RtmClient(strToken, {
    dataStore: new MemoryDataStore(),
  });

  rtm.start();

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
    // initModule(rtmStartData);
  });

  rtm.on(RTM_EVENTS.MESSAGE, function(message) {
    console.log(message.text);
    if (!message.text) {
      return;
    }
    // message.userName = rtm.dataStore.getUserById(message.user) ? rtm.dataStore.getUserById(message.user).name : "none";
    // message.team = rtm.dataStore.getTeamById(rtm.activeTeamId).name;
    // message.channelName = rtm.dataStore.getChannelGroupOrDMById(message.channel).name;
    // inputParser(message.text, message, funcBakeChannel(message.channel, rtm));
  });

  // apps.forEach(a => {
  //   if (a.emitter) {
  //     require("../../apps/" + a.strName.toLowerCase() + "/emitter/emitter.js")();
  //   }
  // });

};

// TODO remove all types from var names
