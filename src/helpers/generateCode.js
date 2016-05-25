module.exports  = function generate(name) {
  "use strict";
  let code = "";
  let nb = 0;
  for (let i = 0; i < name.length; i += 1) {
    nb = charcode(name.charCodeAt(i));
    code += String.fromCharCode(nb);
  }
  return code;
};

const rand = function(n) {
  "use strict";
  return parseInt(n * (10 * Math.random()) % 90);
};

const charcode = function(c) {
  "use strict";
  c = rand(c);
  return c > 48 && c < 90 ? c : charcode(c + 1);
};
