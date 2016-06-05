const cron      = require("node-schedule");
const request   = require("request");
const Project   = require("../models/Project");
const Watcher   = require("../../../services/slack/models/Watcher");
const User      = require("../../../services/slack/models/User");

module.exports = function() {
  "use strict";

  console.log("Starting Scrum Cron");

  cron.scheduleJob("0 15 * * *", function() {
    console.log(new Date(), "starting asking projects members");
    askProjectMembers();
  });

  // TODO make another cron for project owners
   
  cron.scheduleJob("1 * * * * *", function() {
    spamCoin();
  })

};

function spamCoin() {
  console.log(new Date())
  console.log("spamming coin")
  const url = "https://slack.com/api/chat.postMessage?token=" + process.env.SLACK_API_TOKEN +
              "&channel=%40supercoincoin&text=hey%20!%20tu%20es%20dans%20le%20projet%20" + "alorsonspam" +
              ".%20alors%20tu%20as%20taff%C3%A9%20sur%20quoi%20cette%20semaine%20%3F%20%3A)&as_user=true";
  request(url); 
}


function askProjectMembers() {
  "use strict";
  Project.model.find({ archived: false }, function (err, projects) {

    if (err) {

      console.log(err);

    } else {

      let hash = {};

      projects.forEach(p => {
        p.members.forEach(m => {
          if (hash[m]) {
            hash[m].push(p.name);
          } else {
            hash[m] = [p.name];
          }
        });
      });

      console.log(hash);
      
      for (let member in hash) {
        if (hash.hasOwnProperty(member)) {

          User.model.findOne({ id: member }, function(err, user) {
            truc(err, user, hash, member);
          });
        }
      }

    }

  });
}

function truc(err, user, hash, member) {
  "use strict";
  if (err) {
    console.log(err);
  } else {
    console.log(user.name);

    const projectName = hash[member].shift();
    const url = "https://slack.com/api/chat.postMessage?token=" + process.env.SLACK_API_TOKEN +
                "&channel=%40" + user.name + "&text=hey%20!%20tu%20es%20dans%20le%20projet%20" + projectName +
                ".%20alors%20tu%20as%20taff%C3%A9%20sur%20quoi%20cette%20semaine%20%3F%20%3A)&as_user=true";
    if (hash[member].length) {

      const otherUrl = "https://slack.com/api/chat.postMessage?token=" + process.env.SLACK_API_TOKEN +
                  "&channel=%40" + user.name + "&text=tes%20projets%20sont%20nombreux&as_user=true";

      setTimeout(() => {
        request(otherUrl, (err) => {
          if (err) {
            console.log(err);
          } else {
            request(url, (err, res, body) => {
              if (err) {
                console.log(err);
              } else {
                console.log(body);
                const channel = JSON.parse(body).channel;
                Watcher.createWatcher({
                  app: "scrum",
                  channel,
                  state: "FIRST_QUESTION",
                  data: { project: projectName, user: user.name, projects: hash[member] },
                });
              }
            });
          }
        }, 1000);
      });

    } else {

      request(url, (err, res, body) => {
        if (err) {
          console.log(err);
        } else {
          console.log(body);
          const channel = JSON.parse(body).channel;
          Watcher.createWatcher({
            app: "scrum",
            channel,
            state: "FIRST_QUESTION",
            data: { project: projectName, user: user.name },
          });
        }
      });

    }
  }
}