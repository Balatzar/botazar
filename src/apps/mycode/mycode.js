import regenerateModule from "./modules/regenerateModule";
import baseModule from "./modules/baseModule";
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    console.log(arrInput);
    console.log(strCommand);
    switch (strCommand) {
        case "-regen":
        case "-r": {
            regenerateModule(objMessage, funcOut);
            break;
        }
        default: {
            baseModule(objMessage, funcOut);
        }
    }
};
