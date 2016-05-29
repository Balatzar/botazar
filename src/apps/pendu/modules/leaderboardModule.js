const Player = require("../models/Player");
export default function (funcOut) {
    Player.model.find({}).sort({ points: -1 }).limit(10).exec(function (err, players) {
        if (err) {
            console.log(err);
        }
        else {
            let res = "";
            let i = 0;
            players.forEach(p => {
                i += 1;
                res += ">*" + i + " : " + p.username + "* - " + p.points + " points (" + p.games + " parties gagnées)\n\n";
            });
            funcOut(res);
        }
    });
}
;
