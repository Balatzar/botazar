const Feedback = require("../models/Feedback");

module.exports = function(input, user) {
  "use strict";
  let sanitized = input.split(" ");

  if (sanitized.length < 2) {
    return "Argument missing";
  }

  console.log(sanitized)

  let type = sanitized.shift();

  console.log(type)

  if (type !== "idea" &&
      type !== "bug" &&
      type !== "msg") {
    return "Wrong type.";
  }

  Feedback.createFeedback({
    user: user,
    type: type,
    text: sanitized.join(" ")
  });

  return "Thanks for your input!";
};
