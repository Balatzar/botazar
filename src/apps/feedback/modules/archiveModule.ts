const Feedback = require("../models/Feedback");

export default function(id: string, channel: string, out: (msg: string) => any) {
  "use strict";
  Feedback.archiveFeedback(id, channel, out);
};
