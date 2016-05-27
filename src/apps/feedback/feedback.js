"use strict";
const helpModule_1 = require("./modules/helpModule");
const baseModule_1 = require("./modules/baseModule");
const listModule_1 = require("./modules/listModule");
const archiveModule_1 = require("./modules/archiveModule");
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    "use strict";
    // TODO create routes to get reports (specify types or limit)
    // TODO create CRUD
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
