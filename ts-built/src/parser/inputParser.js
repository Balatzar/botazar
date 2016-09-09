"use strict";
var jsonParser_1 = require("./jsonParser");
var Watcher_1 = require("../services/slack/models/Watcher");
var arrBotNames = ["baltabot", "botazar", "botazar:",
    "<@U1082RRH8>:", "balthabot", "petikon", "bz"];
var apps = jsonParser_1.default();
function default_1(strInput, objMessage, funcOut) {
    Watcher_1.default.model.find({ activated: true }, function (err, watchers) {
        if (err) {
            console.log(err);
        }
        else {
            watchers.forEach(function (w) {
                if (w.channel === objMessage.channel) {
                    require("../apps/" + w.app + "/" + w.app)(strInput.split(" "), "", objMessage, funcOut);
                }
            });
        }
    });
    var arrSanitizedInput = strInput.split(" ");
    if (arrBotNames.indexOf(arrSanitizedInput[0].toLowerCase()) !== -1) {
        arrSanitizedInput.shift();
        if (!arrSanitizedInput.length) {
            return;
        }
        var strApp = arrSanitizedInput.shift();
        var strCommand = "";
        if (arrSanitizedInput[0] && arrSanitizedInput[0][0] === "-") {
            strCommand = arrSanitizedInput.shift().toLowerCase();
        }
        for (var i = 0; i < apps.length; i += 1) {
            if (apps[i].arrAliases.indexOf(strApp.toLowerCase()) !== -1 && apps[i].boolNamed) {
                require("../apps/" + apps[i].strName.toLowerCase() + "/" + apps[i].strEntry)(arrSanitizedInput, strCommand, objMessage, funcOut);
                return;
            }
        }
    }
    else {
        for (var i = 0; i < apps.length; i += 1) {
            if (funcReg(apps[i], arrSanitizedInput)) {
                require("../apps/" + apps[i].strName.toLowerCase() + "/" + apps[i].strEntry)(arrSanitizedInput, undefined, objMessage, funcOut);
            }
        }
    }
    return;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
function funcReg(objApp, arrInput) {
    var regex = objApp.regex ? new RegExp(objApp.regex) : false;
    if (!regex) {
        return false;
    }
    for (var i = 0; i < arrInput.length; i += 1) {
        if (regex.test(arrInput[i])) {
            return true;
        }
    }
    return false;
}
