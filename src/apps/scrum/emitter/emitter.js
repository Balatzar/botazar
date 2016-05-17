const cron      = require("node-schedule");
const request   = require("request");
const Project   = require("../models/Project");
const Watcher   = require("../../../services/slack/models/Watcher");
const User      = require("../../../services/slack/models/User");

module.exports = function() {
  "use strict";

  console.log("Starting Scrum Cron");

  cron.scheduleJob("53 20 * * *", function(){
    console.log(new Date(), "starting asking");
    startAsking();
  });

};

function startAsking() {
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
              const req = "https://slack.com/api/chat.postMessage?token=" + process.env.SLACK_API_TOKEN +
              "&channel=%40" + user.name + "&text=hey%20!%20tu%20es%20dans%20le%20projet%20" + p.name +
              ".%20alors%20tu%20as%20taff%C3%A9%20sur%20quoi%20cette%20semaine%20%3F%20%3A)&as_user=true";
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
                    data: { project: p.name, user: p.ownerName }
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
