module.exports = function(funcOut) {
  "use strict";

  const res = "vous pouvez créer un projet en écrivant `bz scrum -create` (ou `bz sc -c` pour " +
              "les gens pressés !";

  funcOut(res);
};
