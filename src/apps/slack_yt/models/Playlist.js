const mongoose = require("mongoose");

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
      else {
        funcGetTokensAndSendPlaylist(playlist.id);
      }
    });
  }

};

module.exports = Playlist;
