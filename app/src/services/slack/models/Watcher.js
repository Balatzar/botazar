import mongoose from "mongoose";

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

  createWatcher: function(watcher) {
    Watcher.model.create(watcher);
  },

};

export default Watcher;
