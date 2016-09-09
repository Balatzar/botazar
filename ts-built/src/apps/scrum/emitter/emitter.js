var cron = require("node-schedule");
var request = require("request");
var Project = require("../models/Project");
var Watcher = require("../../../services/slack/models/Watcher");
var User = require("../../../services/slack/models/User");
module.exports = function () {
    "use strict";
    console.log("Starting Scrum Cron");
    cron.scheduleJob("0 15 * * *", function () {
        console.log(new Date(), "starting asking projects members");
        askProjectMembers();
    });
};
function askProjectMembers() {
    "use strict";
    Project.model.find({ archived: false }, function (err, projects) {
        if (err) {
            console.log(err);
        }
        else {
            var hash_1 = {};
            projects.forEach(function (p) {
                p.members.forEach(function (m) {
                    if (hash_1[m]) {
                        hash_1[m].push(p.name);
                    }
                    else {
                        hash_1[m] = [p.name];
                    }
                });
            });
            console.log(hash_1);
            var _loop_1 = function(member) {
                if (hash_1.hasOwnProperty(member)) {
                    User.model.findOne({ id: member }, function (err, user) {
                        truc(err, user, hash_1, member);
                    });
                }
            };
            for (var member in hash_1) {
                _loop_1(member);
            }
        }
    });
}
function truc(err, user, hash, member) {
    "use strict";
    if (err) {
        console.log(err);
    }
    else {
        console.log(user.name);
        var projectName_1 = hash[member].shift();
        var url_1 = "https://slack.com/api/chat.postMessage?token=" + process.env.SLACK_API_TOKEN +
            "&channel=%40" + user.name + "&text=hey%20!%20tu%20es%20dans%20le%20projet%20" + projectName_1 +
            ".%20alors%20tu%20as%20taff%C3%A9%20sur%20quoi%20cette%20semaine%20%3F%20%3A)&as_user=true";
        if (hash[member].length) {
            var otherUrl_1 = "https://slack.com/api/chat.postMessage?token=" + process.env.SLACK_API_TOKEN +
                "&channel=%40" + user.name + "&text=tes%20projets%20sont%20nombreux&as_user=true";
            setTimeout(function () {
                request(otherUrl_1, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        request(url_1, function (err, res, body) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(body);
                                var channel = JSON.parse(body).channel;
                                Watcher.createWatcher({
                                    app: "scrum",
                                    channel: channel,
                                    state: "FIRST_QUESTION",
                                    data: { project: projectName_1, user: user.name, projects: hash[member] },
                                });
                            }
                        });
                    }
                }, 1000);
            });
        }
        else {
            request(url_1, function (err, res, body) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(body);
                    var channel = JSON.parse(body).channel;
                    Watcher.createWatcher({
                        app: "scrum",
                        channel: channel,
                        state: "FIRST_QUESTION",
                        data: { project: projectName_1, user: user.name },
                    });
                }
            });
        }
    }
}
