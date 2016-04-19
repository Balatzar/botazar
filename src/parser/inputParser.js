const apps = require("./jsonParser.js")();

module.exports = function(input) {
  "use strict";
  console.log(input);
  if (typeof input !== "string") {
    throw "Input needs to be a string";
  }
  const sanitizedInput = input.toLowerCase().split(" ");
  const app = sanitizedInput.shift();

  for (let i = 0; i < apps.length; i += 1) {
    if (apps[i].aliases.indexOf(app) !== -1) {
      const obj = {
        command: sanitizedInput.shift(),
        text: sanitizedInput ? sanitizedInput.join(" ") : ""
      };
      return require("../apps/" + apps[i].name.toLowerCase() + "/" + apps[i].entry)(obj);
    }
  }

  throw "App not found";
};
