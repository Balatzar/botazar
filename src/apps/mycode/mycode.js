const User = require("../../services/slack/models/User");

module.exports = function(arrInput, strCommand, objMessage, funcOut) {
  "use strict";
  User.model.findOne({ id: objMessage.user }, function(err, user) {
    funcOut(user.code);
  });
};
