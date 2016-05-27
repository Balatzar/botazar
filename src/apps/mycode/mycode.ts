import regenerateModule         from "./modules/regenerateModule";
import baseModule               from "./modules/baseModule";
import { SendMessage, Message } from "../../services/slack/typings/typings";

module.exports = function(arrInput: string, strCommand: string, objMessage: Message, funcOut: SendMessage) {

  console.log(arrInput);
  console.log(strCommand);

  switch(strCommand) {
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
