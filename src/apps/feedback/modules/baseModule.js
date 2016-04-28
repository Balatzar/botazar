const Feedback = require("../models/Feedback");

module.exports = function(input, objMessage, out) {
  "use strict";
  if (!input) {
    return out("il faut du texte !");
  }
  let sanitized = input.split(" ");

  if (sanitized.length < 2 || sanitized[1] === "") {
    return out("il me manque un truc là !");
  }

  let type = sanitized.shift();

  console.log(type);

  if (type !== "idea" &&
      type !== "bug" &&
      type !== "msg") {
    return out("Type inconnu.");
  }

  Feedback.createFeedback({
    type: type,
    text: sanitized.join(" "),
    user: objMessage.user,
    userName: objMessage.userName,
  });

  out("Merci gars");
};
