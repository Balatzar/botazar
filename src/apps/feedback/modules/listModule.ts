const Feedback = require("../models/Feedback");
import { SendMessage } from "../../../services/slack/typings/typings";

export default function(out: SendMessage) {
  Feedback.listAll(out);
};
