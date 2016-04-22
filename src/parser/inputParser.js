const apps = require("./jsonParser.js")();

module.exports = function(input, message, out) {
  "use strict";
  console.log(input);
  if (typeof input !== "string") {
    throw "Input needs to be a string";
  }
  const sanitizedInput = input.toLowerCase().split(" ");
  const app = sanitizedInput.shift();
  let command = "";
  if (sanitizedInput[0][0] === "-") {
    command = sanitizedInput.shift();
  }

  for (let i = 0; i < apps.length; i += 1) {
    if (apps[i].aliases.indexOf(app) !== -1) {
      const input = {
        command: command,
        text: sanitizedInput ? sanitizedInput.join(" ") : "",
      };
      require("../apps/" + apps[i].name.toLowerCase() + "/" + apps[i].entry)(input, message, out);
    }
  }

  out("App non trouvée", message.channel);
};