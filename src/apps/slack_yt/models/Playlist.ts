import * as mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  id: String,
  title: String,
  channel: String,
  url: String,
});

const Playlist = {
  model: mongoose.model("Playlist", playlistSchema),

  createPlaylist: function(playlist) {
    "use strict";
    Playlist.model.create(playlist);
  },

  findCurrentPlaylist(strChannel, funcGetTokensAndSendPlaylist) {
    "use strict";
    Playlist.model.findOne({ channel: strChannel }, function(err, playlist) {
      if (err) {
        console.log(err);
      }
      else if (playlist === null) {
        console.log("no playlist");
      }
      else {
        funcGetTokensAndSendPlaylist(playlist.id);
      }
    });
  }

};

export default Playlist;
