const mongoose  = require("mongoose");
const random    = require('mongoose-random');

const wordSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  word: String,
});

wordSchema.plugin(random, { path: 'r' });

const Word = {
  model: mongoose.model("words", wordSchema),

  createWord: function(word) {
    "use strict";
    Word.model.create(word);
  },
  
};

module.exports = Word;
