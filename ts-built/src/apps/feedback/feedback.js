"use strict";
const helpModule_1 = require("./modules/helpModule");
const baseModule = require("./modules/baseModule");
const listModule = require("./modules/listModule");
const archiveModule = require("./modules/archiveModule");
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
            listModule(funcOut);
            break;
        }
        case "-delete":
        case "-d": {
            archiveModule(arrInput.join(" "), funcOut);
            break;
        }
        default: {
            baseModule(arrInput.join(" "), objMessage, funcOut);
        }
    }
};
