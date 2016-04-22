const Feedback = require("../models/Feedback");

module.exports = function(id, channel, out) {
  "use strict";
  Feedback.archiveFeedback(id, channel, out);
};
