var helpModule = require("./modules/helpModule");
var baseModule = require("./modules/baseModule");
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    "use strict";
    var test = 1;
    console.log(arrInput);
    console.log(strCommand);
    switch (strCommand) {
        case "-help":
        case "-h": {
            helpModule(funcOut);
            break;
        }
        default: {
            baseModule(arrInput, objMessage, funcOut);
        }
    }
};
