const Watcher   = require("../../../services/slack/models/Watcher");
const Project   = require("../models/Project");

module.exports = function(arrInput, objMessage, funcOut) {
  "use strict";

  Watcher.model.find({
    app: "scrum",
    activated: true,
    channel: objMessage.channel,
  }, function(err, watcher) {
    if (err) {
      console.log(err);
    } else if (watcher.length) {
      const currentWatcher = watcher[0];
      const currentState = currentWatcher.state;
      if (currentState === "ASKING_NAME") {
        funcOut("OK le nom de votre projet est bien *" + arrInput.join(" ") + "* ? (oui/non)");
        Project.createProject({
          owner: objMessage.user,
          ownerName: objMessage.userName,
          name: arrInput.join(" "),
        });
        Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { state: "ASKING_CONFIRMATION "}}).exec();
      } else if (currentState === "ASKING_CONFIRMATION") {
        const input = arrInput.join(" ");
        let res;
        if (input === "oui") {
          res = "OK c'est créé !";
        } else if (input === "non") {
          res = "ça roule, c'est quoi du coup ?";
        } else {
          res = "sorry j'ai pas compris";
        }
        funcOut(res);
      }
    } else {
      Watcher.createWatcher({
        app: "scrum",
        channel: objMessage.channel,
        state: "ASKING_NAME",
      });
      funcOut("OK quel est le nom de votre projet ?");
    }
  });
};
