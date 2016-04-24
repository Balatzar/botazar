const helpModule      = require("./modules/helpModule");
const baseModule      = require("./modules/baseModule");
const listModule      = require("./modules/listModule");
const archiveModule   = require("./modules/archiveModule");

module.exports = function(input, out) {
  "use strict";

  console.log(input);

  switch(input.command) {
    case "-help":
    case "-h": {
      helpModule(out);
      break;
    }

    case "-list":
    case "-l": {
      listModule(out);
      break;
    }

    case "-delete":
    case "-d": {
      archiveModule(input.text, out);
      break;
    }

    default: {
      baseModule(input.text, out);
    }
  }
};
