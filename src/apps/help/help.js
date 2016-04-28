const arrApps        = require("../../parser/jsonParser.js")();

module.exports = function(arrInput, strCommand, objMessage, funcOut) {
  "use strict";
  let res = "";

  if (arrInput.length === 1) {
    const strApp = arrInput[0].toLowerCase();

    for (let i = 0; i < arrApps.length; i += 1) {
      if (arrApps[i].arrAliases.indexOf(strApp) !== -1) {
        const currentApp = arrApps[i];
        const strAliases = currentApp.arrAliases;
        const arrCommands = [];

        for (let command in currentApp.commands) {
          if (currentApp.commands.hasOwnProperty(command)) {
            let str = "";
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
        let res = "*" + currentApp.strName + "*\n" +
                  currentApp.description + "\n" +
                  "_Aliases_ : " + strAliases + "\n" +
                  arrCommands.join("\n");
        return funcOut(res);
      }
    }

    return funcOut("j'ai pas trouvé cette application, sorry");
  }

  else {
    const appsNames = arrApps.map(a => "> " + a.strName).join("\n");
    res  += "coucou ! je suis botazar\n" +
            "je suis un peu nul mais je ferais de mon mieux pour vous aider ! :smile:\n\n" +

            "j'ai actuellement " + arrApps.length + " apps que je peux exécuter :\n" +
            appsNames + "\n" +
            "vous pouvez écrire `botazar help [nom app]` pour avoir plus d'info sur une app !";
    funcOut(res);
  }

};
