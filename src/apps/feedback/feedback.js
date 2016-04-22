const helpModule = require("./modules/helpModule");
const baseModule = require("./modules/baseModule");
const listModule = require("./modules/listModule");
const archiveModule = require("./modules/archiveModule");

module.exports = function(input, out) {
  "use strict";

  console.log(input);

  switch(input.command) {
    case "-help":
    case "-h": {
      helpModule(input.message.channel, out);
      break;
    }

    case "-list":
    case "-l": {
      listModule(input.message.channel, out);
      break;
    }

    case "-delete":
    case "-d": {
      archiveModule(input.text, input.message.channel, out);
      break;
    }

    default: {
      if (!input.text) {
        throw "Text input required";
      }
      baseModule(input.text, input.message, out);
    }
  }
};
