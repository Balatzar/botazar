import jsonParser from "../../parser/jsonParser";
// TODO change folder parser to parserS
import { SendMessage, Message } from "../../services/slack/types/types";
import { App, Command } from "../../parser/types/types";

const apps: App[] = jsonParser();

module.exports = function(arrInput: string, strCommand: string, objMessage: Message, funcOut: SendMessage) {
  "use strict";
  let res: string = "";

  if (arrInput.length === 1) {
    const strApp: string = arrInput[0].toLowerCase();

    for (let i = 0; i < apps.length; i += 1) {
      if (apps[i].arrAliases.indexOf(strApp) !== -1) {
        const currentApp: App = apps[i];
        const strAliases = currentApp.arrAliases;
        const arrCommands: string[] = [];

        // TODO this shit is unreadable
        for (let command in currentApp.commands) {
          if (currentApp.commands.hasOwnProperty(command)) {
            let str: string = "";
            str += "\n" + command.toUpperCase() + " : \n";
            for (let prop in currentApp.commands[command]) {
              if (currentApp.commands[command].hasOwnProperty(prop)) {
                str += "*" + prop + "* : ";
                str += currentApp.commands[command][prop] + "\n";
              }
            }
            arrCommands.push(str);
          }
        }
        let res: string = "*" + currentApp.strName + "*\n" +
                  currentApp.description + "\n" +
                  "_Aliases_ : " + strAliases + "\n" +
                  arrCommands.join("\n");
        return funcOut(res);
      }
    }

    return funcOut("j'ai pas trouvé cette application, sorry");
  }

  else {
    const appsNames: string = apps.map(a => "> " + a.strName).join("\n");
    res  += "coucou ! je suis botazar\n" +
            "je suis un peu nul mais je ferais de mon mieux pour vous aider ! :smile:\n\n" +

            "j'ai actuellement " + apps.length + " apps que je peux exécuter :\n" +
            appsNames + "\n" +
            "vous pouvez écrire `botazar help [nom app]` pour avoir plus d'info sur une app !";
    funcOut(res);
  }

};
