const User      = require("../../../services/slack/models/User");
const generate  = require("../../../helpers/generateCode");

module.exports = function(objMessage, funcOut) {
  "use strict";
  User.model.findOneAndUpdate({ id: objMessage.user }, { $set: { code: generate(objMessage.userName) }}, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      funcOut("OK c'est fait !");
    }
  });
};
