"use strict";
const Channel = require("../models/Channel");
const User = require("../models/User");
const Im = require("../models/Im");
function default_1(rtmStartData) {
    "use strict";
    console.log("init");
    User.model.find({}, function (err, users) {
        if (err) {
            console.log(err);
        }
        else if (users.length) {
            return;
        }
        else {
            rtmStartData.users.forEach(u => User.createUser(u));
            rtmStartData.channels.forEach(c => Channel.createChannel(c));
            rtmStartData.ims.forEach(i => Im.createIm(i));
            console.log("Team data stored");
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
