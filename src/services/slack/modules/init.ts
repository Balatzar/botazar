const Channel = require("../models/Channel");
const User    = require("../models/User");
const Im      = require("../models/Im");

export default function(rtmStartData): void {
  "use strict";
  console.log("init");

  User.model.find({}, function(err, users) {
    if (err) {
      console.log(err);
    } else if (users.length) {
      return;
    } else {
      rtmStartData.users.forEach(u => User.createUser(u));
      rtmStartData.channels.forEach(c => Channel.createChannel(c));
      rtmStartData.ims.forEach(i => Im.createIm(i));
      console.log("Team data stored");
    }
  });

};
