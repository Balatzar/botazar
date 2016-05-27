const Feedback = require("../models/Feedback");

export default function(out: (msg: string) => any) {
  "use strict";
  console.log("list");
  Feedback.listAll(out);
};
