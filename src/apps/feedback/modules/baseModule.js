const Feedback = require("../models/Feedback");

module.exports = function(input, message, out) {
  "use strict";
  let sanitized = input.split(" ");

  if (sanitized.length < 2) {
    return "Il me manque un truc là !";
  }

  let type = sanitized.shift();

  console.log(type);

  if (type !== "idea" &&
      type !== "bug" &&
      type !== "msg") {
    out("Type inconnu.", message.channel);
    return;
  }

  Feedback.createFeedback({
    user: message.user,
    type: type,
    text: sanitized.join(" ")
  });

  out("Merci gars", message.channel);
};
