"use strict";
var regenerateModule_1 = require("./modules/regenerateModule");
var baseModule_1 = require("./modules/baseModule");
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    console.log(arrInput);
    console.log(strCommand);
    switch (strCommand) {
        case "-regen":
        case "-r": {
            regenerateModule_1.default(objMessage, funcOut);
            break;
        }
        default: {
            baseModule_1.default(objMessage, funcOut);
        }
    }
};
