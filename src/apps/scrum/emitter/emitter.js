const cron      = require("node-schedule");
const request   = require("request");
const Project   = require("../models/Project");
const Watcher   = require("../../../services/slack/models/Watcher");
const User      = require("../../../services/slack/models/User");

module.exports = function (funcOut) {
  "use strict";

  console.log("Starting Scrum Cron");

  const rule = new cron.RecurrenceRule();
  rule.second = 30;
  cron.scheduleJob(rule, function() {
      console.log(new Date(), "The 30th second of the minute.");
      startAsking(funcOut);
  });

};

function startAsking(funcOut) {
  "use strict";
  Project.model.find({ archived: false }, function(err, projects) {
    if (err) {
      console.log(err);
    } else {
      projects.forEach(p => {
        p.members.forEach(m => {
          User.model.findOne({ id: m }, function(err, user) {
            if (err) {
              console.log(err);
            } else {
              const botIconUrl = "https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fslack-files2%2Favatars%2F2016-05-03%2F39650105828_abeabd888fc3642a7f82_132.png";
              const req = "https://slack.com/api/chat.postMessage?token=" + process.env.SLACK_API_TOKEN +
              "&channel=%40" + user.name + "&text=hey%20!%20tu%20es%20dans%20le%20projet%20" + p.name +
              ".%20alors%20tu%20as%20taff%C3%A9%20sur%20quoi%20cette%20semaine%20%3F%20%3A)&username=botazar&as_user=true&icon_url=" + botIconUrl;
              request(req, function(err, res, body) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(body);
                  const channel = JSON.parse(body).channel;
                  Watcher.createWatcher({
                    app: "scrum",
                    channel,
                    state: "FIRST_QUESTION",
                  });
                }
              });
            }
          });
        });
      });
    }
  });
}