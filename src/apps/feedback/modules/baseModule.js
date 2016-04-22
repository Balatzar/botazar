const Feedback = require("../models/Feedback");

module.exports = function(input, message, out) {
  "use strict";
  let sanitized = input.split(" ");

  if (sanitized.length < 2) {
    return "Argument missing";
  }

  let type = sanitized.shift();

  console.log(type);

  if (type !== "idea" &&
      type !== "bug" &&
      type !== "msg") {
    return "Wrong type.";
  }

  Feedback.createFeedback({
    user: message.user,
    type: type,
    text: sanitized.join(" ")
  });

  out("Merci gars", message.channel);
};
