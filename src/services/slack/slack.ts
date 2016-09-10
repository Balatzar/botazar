const RtmClient         = require("@slack/client").RtmClient;
const RTM_EVENTS        = require("@slack/client").RTM_EVENTS;
const CLIENT_EVENTS     = require("@slack/client").CLIENT_EVENTS;
const MemoryDataStore   = require("@slack/client").MemoryDataStore;

import { Message, SendMessage } from "./typings/typings";

import inputParser  from "../../parser/inputParser";
import jsonParser   from "../../parser/jsonParser";
import initModule   from "./modules/init";

const apps = jsonParser();

export default function(strToken: string): void {

  const rtm = new RtmClient(strToken, {
    dataStore: new MemoryDataStore(),
    // logLevel: "debug",
  });

  rtm.start();

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
    initModule(rtmStartData);
  });

  rtm.on(RTM_EVENTS.MESSAGE, function(Message) {
    console.log(Message.text);
    if (!Message.text) {
      return;
    }
    Message.userName = rtm.dataStore.getUserById(Message.user) ? rtm.dataStore.getUserById(Message.user).name : "none";
    Message.team = rtm.dataStore.getTeamById(rtm.activeTeamId).name;
    Message.channelName = rtm.dataStore.getChannelGroupOrDMById(Message.channel).name;
    inputParser(Message.text, Message, funcBakeChannel(Message.channel, rtm));
  });

  apps.forEach(app => {
    if (app.emitter) {
      require("../../apps/" + app.strName.toLowerCase() + "/emitter/emitter.js")();
    }
  });

};

// TODO remove all types from var names

function funcBakeChannel(channel: string, rtm): (msg: string) => void {
  return function(msg: string): void {
    rtm.sendMessage(msg, channel);
  };
}
