"use strict";
var helpModule_1 = require("./modules/helpModule");
var baseModule_1 = require("./modules/baseModule");
var listModule_1 = require("./modules/listModule");
var archiveModule_1 = require("./modules/archiveModule");
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    console.log(arrInput);
    console.log(strCommand);
    switch (strCommand) {
        case "-help":
        case "-h": {
            helpModule_1.default(funcOut);
            break;
        }
        case "-list":
        case "-l": {
            listModule_1.default(funcOut);
            break;
        }
        case "-delete":
        case "-d": {
            archiveModule_1.default(arrInput.join(" "), objMessage.channel, funcOut);
            break;
        }
        default: {
            baseModule_1.default(arrInput.join(" "), objMessage, funcOut);
        }
    }
};
