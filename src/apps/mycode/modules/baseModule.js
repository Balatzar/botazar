const User = require("../../../services/slack/models/User");
const Channel = require("../../../services/slack/models/Channel");
export default function (objMessage, funcOut) {
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
;
