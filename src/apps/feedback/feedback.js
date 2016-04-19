const helpModule = require("./modules/helpModule");
//const baseModule = require("./modules/baseModule");

module.exports = function(input) {
  "use strict";
  if (!input.command) {
    throw "No command";
  }

  console.log(input)

  switch(input.command) {
    case "-help":
    case "-h":
      return helpModule();

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
