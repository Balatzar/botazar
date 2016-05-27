import * as mongoose from "mongoose";

interface IWatcher extends mongoose.Document {
  createdAt: string,
  activated: boolean,
  channel: string,
  app: string,
  _id: string,
  __v: number,
  state: string,
  data: Object,
}

const watcherSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  activated: { type: Boolean, default: true },
  channel: String,
  app: String,
  state: String,
  data: Object,
});

const Watcher = {
  model: mongoose.model<IWatcher>("watchers", watcherSchema),

  createWatcher: function(watcher) {
    Watcher.model.create(watcher);
  },

};

export default Watcher;
