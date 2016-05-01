const arrApps        = require("./jsonParser.js")();
const arrBotNames    = [ "baltabot", "botazar", "botazar:",
                      "<@U1082RRH8>:", "balthabot", "petikon", "bz" ];
const Watcher        = require("../services/slack/models/Watcher");

module.exports = function(strInput, objMessage, funcOut) {
  "use strict";
  if (typeof strInput !== "string") {
    throw "Input needs to be a string";
  }

  Watcher.model.find({ activated: true }, function(err, watchers) {
    if (err) {
      console.log(err);
    } else {
      watchers.forEach(w => {
        if (w.channel === objMessage.channel) {
          require("../apps/" + w.app + "/" + w.app)(strInput.split(" "), "", objMessage, funcOut);
        }
      })
    }
  })

  const arrSanitizedInput = strInput.split(" ");

  if (arrBotNames.indexOf(arrSanitizedInput[0].toLowerCase()) !== -1) {

    arrSanitizedInput.shift();

    if (!arrSanitizedInput.length) {
      return;
    }

    const strApp = arrSanitizedInput.shift();
    let strCommand = "";
    if (arrSanitizedInput[0] && arrSanitizedInput[0][0] === "-") {
      strCommand = arrSanitizedInput.shift().toLowerCase();
    }

    for (let i = 0; i < arrApps.length; i += 1) {
      if (arrApps[i].arrAliases.indexOf(strApp.toLowerCase()) !== -1 && arrApps[i].boolNamed) {
        require("../apps/" + arrApps[i].strName.toLowerCase() + "/" + arrApps[i].strEntry)(arrSanitizedInput, strCommand, objMessage, funcOut);
        return;
      }
    }

  }

  else {

    for (let i = 0; i < arrApps.length; i += 1) {
      if (funcReg(arrApps[i], arrSanitizedInput)) {
        require("../apps/" + arrApps[i].strName.toLowerCase() + "/" + arrApps[i].strEntry)(arrSanitizedInput, undefined, objMessage, funcOut);
      }
    }

  }

  return;
};

function funcReg(objApp, arrInput) {
  "use strict";
  const regex = objApp.regex ? new RegExp(objApp.regex) : false;
  if (!regex) {
    return false;
  }
  for (let i = 0; i < arrInput.length; i += 1) {
    if (regex.test(arrInput[i])) {
      return true;
    }
  }
  return false;
}
