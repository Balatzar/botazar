"use strict";
const Feedback = require("../models/Feedback");
function default_1(out) {
    "use strict";
    console.log("list");
    Feedback.listAll(out);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
