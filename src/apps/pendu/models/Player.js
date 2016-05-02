const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  points: { type: Number, default: 0 },
  games: { type: Number, default: 1 },
  username: String,
});

const Player = {
  model: mongoose.model("players", playerSchema),

  winGame: function(player) {
    "use strict";
    Player.model.findOneAndUpdate({ username: player.username }, { $inc: { points: player.points, games: 1 }}, function(err, query) {
      if (err) {
        console.log(err);
      } else {
        if (!query) {
          Player.model.create(player);
        }
      }
    });
  },
  
};

module.exports = Player;
