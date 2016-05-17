"use strict";
const Watcher   = require("../../../services/slack/models/Watcher");
const Project   = require("../models/Project");
const Report    = require("../models/Report");

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
            funcOut("OK le nom de votre projet est bien *" + input + "* ? (oui/non)");
            Project.createProject({
              owner: objMessage.user,
              ownerName: objMessage.userName,
              name: input,
              members: [objMessage.user],
              membersNames: [objMessage.userName],
            });
            Watcher.model.findOneAndUpdate({ activated: true, channel: objMessage.channel }, { $set: { state: "ASKING_CONFIRMATION", data: { name: input, user: objMessage.userName }}}).exec();
          }
        });
      }

      else if (currentState === "ASKING_CONFIRMATION") {
        console.log("in ASKING_CONFIRMATION");
        let res;
        if (input === "oui") {
          res = "OK c'est créé !\nvoulez vous ajouter des gens ?";
          Watcher.model.findOneAndUpdate({ activated: true, channel: objMessage.channel }, { $set: { state: "ASKING_PEOPLE" }}).exec();
        } else if (input === "non") {
          res = "ça roule, c'est quoi du coup ?";
          Watcher.model.findOneAndUpdate({ activated: true, channel: objMessage.channel }, { $set: { state: "ASKING_NAME" }}).exec();
        } else {
          res = "sorry j'ai pas compris";
        }
        funcOut(res);
      }

      else if (currentState === "ASKING_PEOPLE") {
        console.log("in ASKING_PEOPLE");
        if (input === "oui") {
          funcOut("OK, mettez les noms des gens avec des @ siouplay");
        } else if (input === "non") {
          funcOut("OK bon bah on a fini !");
          Watcher.model.findOneAndUpdate({ activated: true, channel: objMessage.channel }, { $set: { activated: false }}).exec();
        } else {
          Watcher.model.findOneAndUpdate({ activated: true, channel: objMessage.channel }, { $set: { activated: false }}, function(err, watcher) {
            if (err) {
              console.log(err);
            } else {
              let names = arrInput.filter(s => /\b\U\w{8}\b/g.test(s)).map(n => n.slice(2, 11));
              names.forEach(n => Project.model.findOneAndUpdate({ name: watcher.data.name }, { $addToSet: { members: n }}).exec());
              funcOut("OK noms enregistrés, merci !");
            }
          });
        }
      }

      else if (currentState === "FIRST_QUESTION") {
        Watcher.model.findOneAndUpdate({ activated: true, channel: objMessage.channel }, { $set: { state: "SECOND_QUESTION" }}, function(err, watcher) {
          if (err) {
            console.log(err);
          } else {
            const first = input;
            Report.createReport({
              first,
              project: watcher.data.project,
              user: watcher.data.user,
            });
          }
        });
        funcOut("ok super et quels problèmes t'as rencontré ?");
      }

      else if (currentState === "SECOND_QUESTION") {
        const second = input;
        Watcher.model.findOneAndUpdate({ activated: true, channel: objMessage.channel }, { $set: { state: "THIRD_QUESTION" }}, function(err, watcher) {
          if (err) {
            console.log(err);
          } else {
            Report.model.findOneAndUpdate({ editing: true, user: watcher.data.user }, { $set: { second }}).exec();
          }
        });
        funcOut("ça roule et tu compte travailler sur quoi la semaine prochaine ?");
      }

      else if (currentState === "THIRD_QUESTION") {
        Watcher.model.findOneAndUpdate({ activated: true, channel: objMessage.channel }, { $set: { activated: false }}, function(err, watcher) {
          if (err) {
            console.log(err);
          } else {
            const third = input;
            Report.model.findOneAndUpdate({ editing: true, user: watcher.data.user }, { $set: { third, editing: false }}).exec();
          }
        });
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
