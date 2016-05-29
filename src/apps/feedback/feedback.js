import helpModule from "./modules/helpModule";
import baseModule from "./modules/baseModule";
import listModule from "./modules/listModule";
import archiveModule from "./modules/archiveModule";
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    console.log(arrInput);
    console.log(strCommand);
    switch (strCommand) {
        case "-help":
        case "-h": {
            helpModule(funcOut);
            break;
        }
        case "-list":
        case "-l": {
            listModule(funcOut);
            break;
        }
        case "-delete":
        case "-d": {
            archiveModule(arrInput.join(" "), objMessage.channel, funcOut);
            break;
        }
        default: {
            baseModule(arrInput.join(" "), objMessage, funcOut);
        }
    }
};
