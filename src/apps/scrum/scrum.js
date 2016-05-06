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

    case "-configure":
    case "-c": {
      configureModule(funcOut);
      break;
    }

    default: {
      helpModule(funcOut);
    }
  }
};