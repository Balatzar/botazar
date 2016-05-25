const regenerateModule    = require("./modules/regenerateModule");
const baseModule          = require("./modules/baseModule");

module.exports = function(arrInput, strCommand, objMessage, funcOut) {
  "use strict";

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
