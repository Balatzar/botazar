const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  playing: { type: Boolean, default: true },
  channel: String,
  winners: [String],
  points: { type: Number, default: 10 },
});

const Game = {
  model: mongoose.model("games", gameSchema),

  createGame: function(game) {
    "use strict";
    Tokens.model.create(game);
  },
  
};

module.exports = Game;
