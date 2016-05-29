const Feedback = require("../models/Feedback");
import { SendMessage } from "../../../services/slack/types/types";

export default function(out: SendMessage) {
  Feedback.listAll(out);
};
