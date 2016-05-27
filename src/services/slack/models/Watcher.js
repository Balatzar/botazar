"use strict";
const mongoose = require("mongoose");
const watcherSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    activated: { type: Boolean, default: true },
    channel: String,
    app: String,
    state: String,
    data: Object,
});
const Watcher = {
    model: mongoose.model("watchers", watcherSchema),
    createWatcher: function (watcher) {
        "use strict";
        Watcher.model.create(watcher);
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Watcher;
