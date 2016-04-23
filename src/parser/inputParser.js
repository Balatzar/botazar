const apps        = require("./jsonParser.js")();
const botNames    = [ "baltabot", "botazar", "botazar:",
                      "<@U1082RRH8>:", "balthabot", "petikon" ];

module.exports = function(input, message, out) {
  "use strict";
  if (typeof input !== "string") {
    throw "Input needs to be a string";
  }
  const sanitizedInput = input.toLowerCase().split(" ");
  let named = false;

  if (botNames.indexOf(sanitizedInput[0]) !== -1) {
    sanitizedInput.shift();
    named = true;
  }

  const app = sanitizedInput.shift();
  let command = "";
  if (sanitizedInput[0] && sanitizedInput[0][0] === "-") {
    command = sanitizedInput.shift();
  }

  for (let i = 0; i < apps.length; i += 1) {
    if (apps[i].aliases.indexOf(app) !== -1 && apps[i].named === named) {
      const input = {
        command: command,
        text: sanitizedInput ? sanitizedInput.join(" ") : "",
      };
      require("../apps/" + apps[i].name.toLowerCase() + "/" + apps[i].entry)(input, message, out);
      return;
    }
  }

  return;
};
