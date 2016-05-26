const helpModule          = require("./modules/helpModule");
const leaderboardModule   = require("./modules/leaderboardModule");
const baseModule          = require("./modules/baseModule");

module.exports = function(arrInput, strCommand, objMessage, funcOut) {
  "use strict";

  // TODO make an api route to get a random word
  // TODO make an api set of routes to play a game

  console.log(arrInput);
  console.log(strCommand);

  switch(strCommand) {
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
