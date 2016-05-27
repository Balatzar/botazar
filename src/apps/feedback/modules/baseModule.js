"use strict";
const Feedback = require("../models/Feedback");
function default_1(input, objMessage, out) {
    if (!input) {
        return out("il faut du texte !");
    }
    let sanitized = input.split(" ");
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
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
function isWrongType(type) {
    if (type !== "idea" &&
        type !== "bug" &&
        type !== "msg") {
        return true;
    }
    else {
        return false;
    }
}
