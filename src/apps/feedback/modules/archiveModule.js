const Feedback = require("../models/Feedback");
export default function (id, channel, out) {
    Feedback.archiveFeedback(id, channel, out);
}
;
