const helpModule      = require("./modules/helpModule");
const baseModule      = require("./modules/baseModule");
const listModule      = require("./modules/listModule");
const archiveModule   = require("./modules/archiveModule");

module.exports = function(arrInput, strCommand, funcOut) {
  "use strict";

  console.log(arrInput);
  console.log(strCommand);

  switch(strCommand) {
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
      archiveModule(arrInput.join(" "), funcOut);
      break;
    }

    default: {
      baseModule(arrInput.join(" "), funcOut);
    }
  }
};
