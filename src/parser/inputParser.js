const arrApps        = require("./jsonParser.js")();
const arrBotNames    = [ "baltabot", "botazar", "botazar:",
                      "<@U1082RRH8>:", "balthabot", "petikon" ];

module.exports = function(strInput, objMessage, funcOut) {
  "use strict";
  if (typeof strInput !== "string") {
    throw "Input needs to be a string";
  }

  const arrSanitizedInput = strInput.split(" ");

  if (arrBotNames.indexOf(arrSanitizedInput[0]) !== -1) {

    arrSanitizedInput.shift();

    if (!arrSanitizedInput.length) {
      return;
    }

    const strApp = arrSanitizedInput.shift();
    let strCommand = "";
    if (arrSanitizedInput[0] && arrSanitizedInput[0][0] === "-") {
      strCommand = arrSanitizedInput.shift();
    }

    for (let i = 0; i < arrApps.length; i += 1) {
      if (arrApps[i].arrAliases.indexOf(strApp) !== -1 && arrApps[i].boolNamed) {
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


/*

recevoir l'input string

le mettre en lower case et le découper dans un array

regarder si le premier index de l'array est le nom du bot

  si oui c'est une app nommée qui doit avoir un nom d'app et éventuellement une commande
    extraire le premier index et le mettre dans une variable app
    regarder si le nouveau premier index a un -, si oui l'extraire et le mettre dans une var
    chercher l'app correspondante et l'appeller si elle existe avec la commande eventuellement
      -> trouvée et tout l'arr restant

  si non c'est peut etre une app regex
    tester les regex des apps qui en ont avec tous les elements de l'arr input
    si une est valide, l'appeller avec tout l'arr

  si rien on ne fait rien

*/
