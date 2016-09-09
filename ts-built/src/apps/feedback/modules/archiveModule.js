"use strict";
var Feedback = require("../models/Feedback");
function default_1(id, channel, out) {
    Feedback.archiveFeedback(id, channel, out);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
