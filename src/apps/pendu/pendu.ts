import helpModule               from "./modules/helpModule";
import leaderboardModule        from "./modules/leaderboardModule";
import baseModule               from "./modules/baseModule";
import { SendMessage, Message } from "../../services/slack/types/types";

module.exports = function(arrInput: string, strCommand: string, objMessage: Message, funcOut: SendMessage) {

  // TODO make an api route to get a random word
  // TODO make an api set of routes to play a game
  // TODO make a private route to get the leaderboard

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
