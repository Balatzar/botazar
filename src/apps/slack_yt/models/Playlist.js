const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  id: String,
  title: String,
  channel: String,
});

const Playlist = {
  model: mongoose.model("Playlist", playlistSchema),

  createPlaylist: function(playlist) {
    "use strict";
    Playlist.model.create(playlist);
  },
  
};

module.exports = Playlist;
