const helpModule = require("./modules/help");
const baseModule = require("./modules/base");

module.exports = function(input) {
  "use strict";
  if (!input.command) {
    throw "No command";
  }

  let res;

  switch(input.command) {
    case "-help" || "-h": {
      res = helpModule();
      break;
    }

    default: {
      if (!input.text) {
        throw "Text input required";
      }
      res = baseModule(input.text);
    }
  }

  return res;
};