const Feedback = require("../models/Feedback");

module.exports = function(input, message, out) {
  "use strict";
  if (!input) {
    return out("Il faut du texte !", message.channel);
  }
  let sanitized = input.split(" ");

  if (sanitized.length < 2 || sanitized[1] === "") {
    return out("Il me manque un truc là !", message.channel);
  }

  let type = sanitized.shift();

  console.log(type);

  if (type !== "idea" &&
      type !== "bug" &&
      type !== "msg") {
    return out("Type inconnu.", message.channel);
  }

  Feedback.createFeedback({
    user: message.user,
    type: type,
    text: sanitized.join(" ")
  });

  out("Merci gars", message.channel);
};
