"use strict";
const fs = require("fs");
function default_1() {
    "use strict";
    let apps = [];
    const path = "./src/apps";
    const dirs = fs.readdirSync(path);
    for (let i = 0; i < dirs.length; i += 1) {
        try {
            let commands = fs.readFileSync(path + "/" + dirs[i] + "/commands.json", "utf8");
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
