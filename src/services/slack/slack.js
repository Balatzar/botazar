const RtmClient = require("@slack/client").RtmClient;
const RTM_EVENTS = require("@slack/client").RTM_EVENTS;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;
const MemoryDataStore = require("@slack/client").MemoryDataStore;
import inputParser from "../../parser/inputParser";
import jsonParser from "../../parser/jsonParser";
import initModule from "./modules/init";
const apps = jsonParser();
export default function (strToken) {
    const rtm = new RtmClient(strToken, {
        dataStore: new MemoryDataStore(),
    });
    rtm.start();
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
        console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
        initModule(rtmStartData);
    });
    rtm.on(RTM_EVENTS.MESSAGE, function (Message) {
        console.log(Message.text);
        if (!Message.text) {
            return;
        }
        Message.userName = rtm.dataStore.getUserById(Message.user) ? rtm.dataStore.getUserById(Message.user).name : "none";
        Message.team = rtm.dataStore.getTeamById(rtm.activeTeamId).name;
        Message.channelName = rtm.dataStore.getChannelGroupOrDMById(Message.channel).name;
        inputParser(Message.text, Message, funcBakeChannel(Message.channel, rtm));
    });
    apps.forEach(a => {
        if (a.emitter) {
            require("../../apps/" + a.strName.toLowerCase() + "/emitter/emitter.js")();
        }
    });
}
;
function funcBakeChannel(strChannel, rtm) {
    return function (strMsg) {
        rtm.sendMessage(strMsg, strChannel);
    };
}
