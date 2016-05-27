const helpModule         = require("./modules/helpModule");
const baseModule         = require("./modules/baseModule");
// const configureModule     = require("./modules/configureModule");

module.exports = function(arrInput, strCommand, objMessage, funcOut) {
  "use strict";

  var test = 1
  console.log(arrInput);
  console.log(strCommand);

  switch(strCommand) {
    case "-help":
    case "-h": {
      helpModule(funcOut);
      break;
    }

    // case "-configure":
    // case "-c": {
    //   configureModule(funcOut);
    //   break;
    // }

    default: {
      baseModule(arrInput, objMessage, funcOut);
    }
  }
};