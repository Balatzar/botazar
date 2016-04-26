const helpModule        = require("./modules/helpModule");
// const listModule        = require("./modules/listModule");
const initModule        = require("./modules/initModule");
const createModule      = require("./modules/createModule");
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

    // case "-list":
    // case "-l": {
    //   listModule(funcOut);
    //   break;
    // }

    case "-init":
    case "-i": {
      initModule(objMessage, funcOut);
      break;
    }

    case "-create":
    case "-c": {
      createModule(arrInput, funcOut);
      break;
    }

    default: {
      baseModule(arrInput, funcOut);
    }
  }

};
