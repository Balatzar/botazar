const helpModule        = require("./modules/helpModule");
const infoModule        = require("./modules/infoModule");
const createModule      = require("./modules/createModule");
const loginModule       = require("./modules/loginModule");
const baseModule        = require("./modules/baseModule");

module.exports = function(arrInput, strCommand, objMessage, funcOut) {
  "use strict";

  console.log(arrInput);
  console.log(strCommand);

  switch(strCommand) {
    case "-help":
    case "-h": {
      helpModule(funcOut);
      break;
    }

    case "-info":
    case "-i": {
      infoModule(objMessage, funcOut);
      break;
    }

    case "-create":
    case "-c": {
      createModule(objMessage, funcOut);
      break;
    }

    case "-login":
    case "-l": {
      loginModule(arrInput, funcOut);
      break;
    }

    default: {
      baseModule(arrInput, objMessage, funcOut);
    }
  }

};
