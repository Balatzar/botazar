"use strict";
var Player = require("../models/Player");
function default_1(funcOut) {
    Player.model.find({}).sort({ points: -1 }).limit(10).exec(function (err, players) {
        if (err) {
            console.log(err);
        }
        else {
            var res_1 = "";
            var i_1 = 0;
            players.forEach(function (p) {
                i_1 += 1;
                res_1 += ">*" + i_1 + " : " + p.username + "* - " + p.points + " points (" + p.games + " parties gagnées)\n\n";
            });
            funcOut(res_1);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
