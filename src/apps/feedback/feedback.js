const helpModule = require("./modules/helpModule");
const baseModule = require("./modules/baseModule");
const listModule = require("./modules/listModule");

module.exports = function(input) {
  "use strict";

  console.log(input);

  switch(input.command) {
    case "-help":
    case "-h":
      return helpModule();

    case "-list":
    case "-l":
      return listModule();

    default: {
      if (!input.text) {
        throw "Text input required";
      }
      return baseModule(input.text, input.user);
    }
  }
};
