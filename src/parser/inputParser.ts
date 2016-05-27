import jsonParser               from "./jsonParser";
import { Message, SendMessage } from "../services/slack/typings/typings";
import { App }                  from "./typings/typings";
import Watcher                  from "../services/slack/models/Watcher";

const arrBotNames: [string]  = [ "baltabot", "botazar", "botazar:",
                                 "<@U1082RRH8>:", "balthabot", "petikon", "bz" ];

const apps = jsonParser();

export default function(strInput: string, objMessage: Message, funcOut: SendMessage): void {

  Watcher.model.find({ activated: true }, function(err, watchers) {
    if (err) {
      console.log(err);
    } else {
      watchers.forEach(w => {
        if (w.channel === objMessage.channel) {
          require("../apps/" + w.app + "/" + w.app)(strInput.split(" "), "", objMessage, funcOut);
        }
      });
    }
  });

  const arrSanitizedInput: string[] = strInput.split(" ");

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

    for (let i = 0; i < apps.length; i += 1) {
      if (apps[i].arrAliases.indexOf(strApp.toLowerCase()) !== -1 && apps[i].boolNamed) {
        require("../apps/" + apps[i].strName.toLowerCase() + "/" + apps[i].strEntry)(arrSanitizedInput, strCommand, objMessage, funcOut);
        return;
      }
    }

  }

  else {

    for (let i = 0; i < apps.length; i += 1) {
      if (funcReg(apps[i], arrSanitizedInput)) {
        require("../apps/" + apps[i].strName.toLowerCase() + "/" + apps[i].strEntry)(arrSanitizedInput, undefined, objMessage, funcOut);
      }
    }

  }

  return;
};

function funcReg(objApp: App, arrInput: string[]): boolean {
  const regex: any = objApp.regex ? new RegExp(objApp.regex) : false;
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
