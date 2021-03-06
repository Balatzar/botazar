const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  playing: { type: Boolean, default: true },
  channel: String,
  participants: [String],
  points: { type: Number, default: 10 },
  word: String,
  current: String,
  played: [String],
});

const Game = {
  model: mongoose.model("games", gameSchema),

  createGame: function(game) {
    "use strict";
    Game.model.create(game);
  },
  
};

module.exports = Game;
