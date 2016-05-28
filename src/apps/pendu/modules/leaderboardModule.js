"use strict";
const Player = require("../models/Player");
function default_1(funcOut) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
