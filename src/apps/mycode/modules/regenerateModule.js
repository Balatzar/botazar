"use strict";
const User = require("../../../services/slack/models/User");
const generate = require("../../../helpers/generateCode");
function default_1(objMessage, funcOut) {
    User.model.findOneAndUpdate({ id: objMessage.user }, { $set: { code: generate(objMessage.userName) } }, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            funcOut("OK c'est fait !");
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
