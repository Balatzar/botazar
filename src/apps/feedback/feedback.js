const helpModule      = require("./modules/helpModule");
const baseModule      = require("./modules/baseModule");
const listModule      = require("./modules/listModule");
const archiveModule   = require("./modules/archiveModule");

module.exports = function(input, message, out) {
  "use strict";

  console.log(input);

  switch(input.command) {
    case "-help":
    case "-h": {
      helpModule(message.channel, out);
      break;
    }

    case "-list":
    case "-l": {
      listModule(message.channel, out);
      break;
    }

    case "-delete":
    case "-d": {
      archiveModule(input.text, message.channel, out);
      break;
    }

    default: {
      if (!input.text) {
        return out("Text input required", message.channel);
      }
      baseModule(input.text, message, out);
    }
  }
};
