const mongoose = require("mongoose");

const tokensSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  access_token: String,
  expiry_date: String,
  refresh_token: String,
});

const Tokens = {
  model: mongoose.model("tokens", tokensSchema),

  createTokens: function(tokens) {
    "use strict";
    Tokens.model.create(tokens);
  },
  
};

module.exports = Tokens;
