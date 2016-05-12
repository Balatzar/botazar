const request = require("request");
const Channel = require("../models/Channel");
const User    = require("../models/User");
const Im      = require("../models/Im");

module.exports = function(rtmStartData) {
  console.log("init")
      request("https://slack.com/api/im.list?token=" + process.env.SLACK_API_TOKEN, function(err, res, body) {
        if (err) {
          console.log(err);
        } else {
          console.log(body.ims)
        }
      })

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
