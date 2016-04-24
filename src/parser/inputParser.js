const apps        = require("./jsonParser.js")();
const botNames    = [ "baltabot", "botazar", "botazar:",
                      "<@U1082RRH8>:", "balthabot", "petikon" ];

module.exports = function(input, out) {
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
    if ((apps[i].aliases.indexOf(app) !== -1 && apps[i].named === named) ||
          reg(apps[i], app.concat(sanitizedInput))) {
      const input = {
        command: command,
        text: sanitizedInput ? sanitizedInput.join(" ") : "",
      };
      require("../apps/" + apps[i].name.toLowerCase() + "/" + apps[i].entry)(input, out);
    }
  }

  return;
};

function reg(app, input) {
  "use strict";
  const regex = app.regex ? new RegExp(app.regex) : false;
  if (!regex) {
    return false;
  }
  if (typeof input === "string") {
    return regex.test(input);
  }
  for (let i = 0; i < input.length; i += 1) {
    if (regex.test(input[i])) {
      return true;
    }
  }
  return false;
}
