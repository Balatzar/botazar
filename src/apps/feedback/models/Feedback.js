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
  },

  listAll: function() {
    "use strict";
    const feeds = Feedback.model.find({});
    console.log(Feedback.model.find({}))
    return feeds;
  }
};

module.exports = Feedback;
