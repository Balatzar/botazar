const mongoose = require("mongoose");

const watcherSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  activated: { type: Boolean, default: true },
  channel: String,
  app: String,
});

const Watcher = {
  model: mongoose.model("watchers", watcherSchema),

  createWatcher: function(watcher) {
    "use strict";
    Watcher.model.create(watcher);
  },
  
};

module.exports = Watcher;
