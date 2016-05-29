"use strict";
var mongoose = require("mongoose");
var watcherSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    activated: { type: Boolean, default: true },
    channel: String,
    app: String,
    state: String,
    data: Object,
});
var Watcher = {
    model: mongoose.model("watchers", watcherSchema),
    createWatcher: function (watcher) {
        Watcher.model.create(watcher);
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Watcher;
