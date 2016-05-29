import helpModule from "./modules/helpModule";
import leaderboardModule from "./modules/leaderboardModule";
import baseModule from "./modules/baseModule";
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    console.log(arrInput);
    console.log(strCommand);
    switch (strCommand) {
        case "-help":
        case "-h": {
            helpModule(funcOut);
            break;
        }
        case "-leaderboard":
        case "-l": {
            leaderboardModule(funcOut);
            break;
        }
        default: {
            baseModule(arrInput, objMessage, funcOut);
        }
    }
};
