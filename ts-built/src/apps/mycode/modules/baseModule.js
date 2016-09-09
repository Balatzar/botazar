"use strict";
var User = require("../../../services/slack/models/User");
var Channel = require("../../../services/slack/models/Channel");
function default_1(objMessage, funcOut) {
    Channel.model.findOne({ id: objMessage.channel }, function (err, channel) {
        if (err) {
            console.log(err);
        }
        else if (channel) {
            funcOut("ne me demandez pas ça dans un channel publique ! :0 venez me voir en mp ;)");
        }
        else {
            User.model.findOne({ id: objMessage.user }, function (err, user) {
                if (err) {
                    console.log(err);
                }
                else {
                    funcOut(user.code);
                }
            });
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
