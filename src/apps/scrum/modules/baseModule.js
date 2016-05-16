"use strict";
const Watcher   = require("../../../services/slack/models/Watcher");
const Project   = require("../models/Project");
const Report    = require("../models/Report");
let strName;
let reportID;

module.exports = function(arrInput, objMessage, funcOut) {

  Watcher.model.find({
    app: "scrum",
    activated: true,
    channel: objMessage.channel,
  }, function(err, watcher) {
    if (err) {
      console.log(err);
    } 

    else if (watcher.length) {
      const currentWatcher = watcher[0];
      const currentState = currentWatcher.state;
      const input = arrInput.join(" ").toLowerCase();
      console.log("currentState : ", currentState);

      if (currentState === "ASKING_NAME") {
        console.log("in ASKING_NAME");
        Project.model.find({ name: input }, function(err, project) {
          if (err) {
            console.log(err);
          } else if (project.length) {
            funcOut("ce projet existe déjà !");
          } else {
            strName = input;
            funcOut("OK le nom de votre projet est bien *" + input + "* ? (oui/non)");
            Project.createProject({
              owner: objMessage.user,
              ownerName: objMessage.userName,
              name: input,
              members: [objMessage.user],
              membersNames: [objMessage.userName],
            });
            Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { state: "ASKING_CONFIRMATION" }}).exec();
          }
        });
      }

      else if (currentState === "ASKING_CONFIRMATION") {
        console.log("in ASKING_CONFIRMATION");
        let res;
        if (input === "oui") {
          res = "OK c'est créé !\nvoulez vous ajouter des gens ?";
          Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { state: "ASKING_PEOPLE" }}).exec();
        } else if (input === "non") {
          res = "ça roule, c'est quoi du coup ?";
          Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { state: "ASKING_NAME" }}).exec();
        } else {
          res = "sorry j'ai pas compris";
        }
        funcOut(res);
      }

      else if (currentState === "ASKING_PEOPLE") {
        console.log("in ASKING_PEOPLE");
        let res;
        if (input === "oui") {
          res = "OK, mettez les noms des gens avec des @ siouplay";
        } else if (input === "non") {
          res = "OK bon bah on a fini !";
          Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { activated: false }}).exec();
        } else {
          let names = arrInput.filter(s => /\b\U\w{8}\b/g.test(s)).map(n => n.slice(2, 11));
          names.forEach(n => Project.model.findOneAndUpdate({ name: strName }, { $addToSet: { members: n }}).exec());
          res = "OK noms enregistrés, merci !";
          Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { activated: false }}).exec();
        }
        funcOut(res);
      }

      else if (currentState === "FIRST_QUESTION") {
        const first = input;
        Report.createReport({
          first,
          project: strName,
          user:objMessage.userName,
        });
        Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { state: "SECOND_QUESTION" }}, function(err, report) {
          if (err) {
            console.log(err);
          } else {
            reportID = report._id;
          }
        });
        funcOut("ok super et quels problèmes t'as rencontré ?");
      }

      else if (currentState === "SECOND_QUESTION") {
        const second = input;
        Report.model.findOneAndUpdate(reportID, { $set: { second }}).exec();
        Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { state: "THIRD_QUESTION" }}).exec();
        funcOut("ça roule et tu compte travailler sur quoi la semaine prochaine ?");
      }

      else if (currentState === "THIRD_QUESTION") {
        const third = input;
        Report.model.findOneAndUpdate(reportID, { $set: { third }}).exec();
        Watcher.model.findByIdAndUpdate(currentWatcher._id, { $set: { activated: false }}).exec();
        funcOut("ok c'est fini merci !");
      }

      else {
        funcOut("ça bug mec");
      }

    } 

    else {
      Watcher.createWatcher({
        app: "scrum",
        channel: objMessage.channel,
        state: "ASKING_NAME",
      });
      funcOut("OK quel est le nom de votre projet ?");
    }
  });
};
