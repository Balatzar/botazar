const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  type: String,
  text: String,
  user: String,
});

const Feedback = {
  model: mongoose.model("Feedback", feedbackSchema),

  createFeedback: function(feedback) {
    "use strict";
    Feedback.model.create(feedback);
  }
};

module.exports = Feedback;
