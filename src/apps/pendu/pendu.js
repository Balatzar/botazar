"use strict";
var helpModule_1 = require("./modules/helpModule");
var leaderboardModule_1 = require("./modules/leaderboardModule");
var baseModule_1 = require("./modules/baseModule");
module.exports = function (arrInput, strCommand, objMessage, funcOut) {
    // TODO make an api route to get a random word
    // TODO make an api set of routes to play a game
    // TODO make a private route to get the leaderboard
    console.log(arrInput);
    console.log(strCommand);
    switch (strCommand) {
        case "-help":
        case "-h": {
            helpModule_1.default(funcOut);
            break;
        }
        case "-leaderboard":
        case "-l": {
            leaderboardModule_1.default(funcOut);
            break;
        }
        default: {
            baseModule_1.default(arrInput, objMessage, funcOut);
        }
    }
};
