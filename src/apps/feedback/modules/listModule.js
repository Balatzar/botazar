const Feedback = require("../models/Feedback");
export default function (out) {
    Feedback.listAll(out);
}
;
