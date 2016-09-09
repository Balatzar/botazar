"use strict";
module.exports = function generate(name) {
    var code = "";
    var nb = 0;
    for (var i = 0; i < name.length; i += 1) {
        nb = charcode(name.charCodeAt(i));
        code += String.fromCharCode(nb);
    }
    return code;
};
var rand = function (n) {
    return Math.floor(n * (10 * Math.random()) % 90);
};
var charcode = function (c) {
    c = rand(c);
    return c > 48 && c < 90 ? c : charcode(c + 1);
};
