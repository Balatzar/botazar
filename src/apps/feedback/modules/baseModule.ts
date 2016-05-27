const Feedback = require("../models/Feedback");
import { Message, SendMessage } from "../../../services/slack/typings/typings";

export default function(input: string, objMessage: Message, out: SendMessage) {
  if (!input) {
    return out("il faut du texte !");
  }
  let sanitized: string[] = input.split(" ");

  if (sanitized.length < 2 || sanitized[1] === "") {
    return out("il me manque un truc là !");
  }

  let type = sanitized.shift();

  console.log(type);

  if (isWrongType(type)) {
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

function isWrongType(type: string): boolean {
  if (type !== "idea" &&
    type !== "bug" &&
    type !== "msg") {
    return true;
  } else {
    return false;
  }
}
