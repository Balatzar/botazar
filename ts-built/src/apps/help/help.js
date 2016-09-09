"use strict";
var jsonParser_1 = require("../../parser/jsonParser");
var apps = jsonParser_1.default();
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    "use strict";
    var res = "";
    if (arrInput.length === 1) {
        var strApp = arrInput[0].toLowerCase();
        for (var i = 0; i < apps.length; i += 1) {
            if (apps[i].arrAliases.indexOf(strApp) !== -1) {
                var currentApp = apps[i];
                var strAliases = currentApp.arrAliases;
                var arrCommands = [];
                for (var command in currentApp.commands) {
                    if (currentApp.commands.hasOwnProperty(command)) {
                        var str = "";
                        str += "\n" + command.toUpperCase() + " : \n";
                        for (var prop in currentApp.commands[command]) {
                            if (currentApp.commands[command].hasOwnProperty(prop)) {
                                str += "*" + prop + "* : ";
                                str += currentApp.commands[command][prop] + "\n";
                            }
                        }
                        arrCommands.push(str);
                    }
                }
                var res_1 = "*" + currentApp.strName + "*\n" +
                    currentApp.description + "\n" +
                    "_Aliases_ : " + strAliases + "\n" +
                    arrCommands.join("\n");
                return funcOut(res_1);
            }
        }
        return funcOut("j'ai pas trouvé cette application, sorry");
    }
    else {
        var appsNames = apps.map(function (a) { return "> " + a.strName; }).join("\n");
        res += "coucou ! je suis botazar\n" +
            "je suis un peu nul mais je ferais de mon mieux pour vous aider ! :smile:\n\n" +
            "j'ai actuellement " + apps.length + " apps que je peux exécuter :\n" +
            appsNames + "\n" +
            "vous pouvez écrire `botazar help [nom app]` pour avoir plus d'info sur une app !";
        funcOut(res);
    }
};
