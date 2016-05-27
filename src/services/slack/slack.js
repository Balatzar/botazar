"use strict";
const RtmClient = require("@slack/client").RtmClient;
const RTM_EVENTS = require("@slack/client").RTM_EVENTS;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;
const MemoryDataStore = require("@slack/client").MemoryDataStore;
const inputParser_1 = require("../../parser/inputParser");
const jsonParser_1 = require("../../parser/jsonParser");
const init_1 = require("./modules/init");
const apps = jsonParser_1.default();
function default_1(strToken) {
    const rtm = new RtmClient(strToken, {
        dataStore: new MemoryDataStore(),
    }); // , { logLevel: "debug" }
    rtm.start();
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
        console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
        init_1.default(rtmStartData);
    });
    rtm.on(RTM_EVENTS.MESSAGE, function (Message) {
        console.log(Message.text);
        if (!Message.text) {
            return;
        }
        Message.userName = rtm.dataStore.getUserById(Message.user) ? rtm.dataStore.getUserById(Message.user).name : "none";
        Message.team = rtm.dataStore.getTeamById(rtm.activeTeamId).name;
        Message.channelName = rtm.dataStore.getChannelGroupOrDMById(Message.channel).name;
        inputParser_1.default(Message.text, Message, funcBakeChannel(Message.channel, rtm));
    });
    apps.forEach(a => {
        if (a.emitter) {
            require("../../apps/" + a.strName.toLowerCase() + "/emitter/emitter.js")();
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
// TODO remove all types from var names
function funcBakeChannel(strChannel, rtm) {
    return function (strMsg) {
        rtm.sendMessage(strMsg, strChannel);
    };
}
