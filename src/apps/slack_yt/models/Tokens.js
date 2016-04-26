const mongoose = require("mongoose");

const tokensSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  access_token: String,
  expiry_date: String,
  refresh_token: String,
});

const Tokens = {
  model: mongoose.model("Tokens", tokensSchema),

  createTokens: function(Tokens) {
    "use strict";
    Tokens.model.create(Tokens);
  },
  
};

module.exports = Tokens;
