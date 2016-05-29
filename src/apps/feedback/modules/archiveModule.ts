const Feedback = require("../models/Feedback");
import { SendMessage } from "../../../services/slack/types/types";

export default function(id: string, channel: string, out: SendMessage) {
  Feedback.archiveFeedback(id, channel, out);
};
