"use strict";
var fs = require("fs");
function default_1() {
    "use strict";
    var apps = [];
    var path = "./src/apps";
    var dirs = fs.readdirSync(path);
    for (var i = 0; i < dirs.length; i += 1) {
        try {
            var commands = fs.readFileSync(path + "/" + dirs[i] + "/commands.json", "utf8");
            apps.push(JSON.parse(commands));
        }
        catch (e) {
            console.log("/!\\ " + dirs[i] + " app has no commands.json");
        }
    }
    return apps;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
