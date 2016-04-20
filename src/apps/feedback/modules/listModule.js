const Feedback = require("../models/Feedback");

module.exports = function() {
  "use strict";
  const feedbacks = Feedback.listAll();
  console.log(feedbacks);
};
