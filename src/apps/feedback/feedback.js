const helpModule = require("./modules/help");
const baseModule = require("./modules/base");

module.exports = function(input) {
  "use strict";
  if (!input.command) {
    throw "No command";
  }

  switch(input.command) {
    case "-help" || "-h": {
      return helpModule();
    }

    default: {
      if (!input.text) {
        throw "Text input required";
      }
      return baseModule(input.text);
    }
  }
};

/*

modules have two parts :
  pure testable function for logic
  i/o (store to db, interact with other services)

*/