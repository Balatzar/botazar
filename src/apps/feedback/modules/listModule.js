const Feedback = require("../models/Feedback");

module.exports = function(channel, out) {
  "use strict";
  console.log("list");
  Feedback.listAll(channel, out);
};
