const User      = require("../../../services/slack/models/User");
const generate = require("../../../helpers/generateCode");
import { SendMessage, Message } from "../../../services/slack/typings/typings";

export default function(objMessage: Message, funcOut: SendMessage) {
  User.model.findOneAndUpdate({ id: objMessage.user }, { $set: { code: generate(objMessage.userName) }}, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      funcOut("OK c'est fait !");
    }
  });
};
