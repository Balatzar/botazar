const Feedback = require("../models/Feedback");
import { SendMessage } from "../../../services/slack/typings/typings";

export default function(id: string, channel: string, out: SendMessage) {
  Feedback.archiveFeedback(id, channel, out);
};
