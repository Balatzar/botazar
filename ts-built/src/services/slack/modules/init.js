"use strict";
var Channel = require("../models/Channel");
var User = require("../models/User");
var Im = require("../models/Im");
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
            rtmStartData.users.forEach(function (u) { return User.createUser(u); });
            rtmStartData.channels.forEach(function (c) { return Channel.createChannel(c); });
            rtmStartData.ims.forEach(function (i) { return Im.createIm(i); });
            console.log("Team data stored");
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
