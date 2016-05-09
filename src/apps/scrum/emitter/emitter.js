const cron      = require('node-schedule');
const Project   = require("../models/Project");
const Watcher   = require("../../../services/slack/models/Watcher");

module.exports = function (funcOut) {
  "use strict";

  console.log("Starting Scrum Cron");

  var rule = new cron.RecurrenceRule();
  rule.second = 30;
  cron.scheduleJob(rule, function() {
      // console.log(new Date(), 'The 30th second of the minute.');
      // startAsking(funcOut);
  });

};

function startAsking(funcOut) {
  Project.model.find({ archived: false }, function(err, projects) {
    if (err) {
      console.log(err);
    } else {
      projects.forEach(p => {
        p.members.forEach(m => {
          // Watcher.createWatcher({
          //   channel: m,
          //   app: "scrum",
          // });
          funcOut("hey ! t'as fait quoi du coup today ? :)", m);
        });
      });
    }
  });
}