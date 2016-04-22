const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  type: String,
  text: String,
  user: String,
  archived: { type: Boolean, default: false },
});

const Feedback = {
  model: mongoose.model("Feedback", feedbackSchema),

  createFeedback: function(feedback) {
    "use strict";
    Feedback.model.create(feedback);
  },

  listAll: function(channel, out) {
    "use strict";
    console.log("fdb model");
    Feedback.model.find({}, function(err, feedbacks) {
      if (err) {
        console.log(err);
      }

      let text = "";
      feedbacks.forEach(fdb => {
        if (fdb.archived) {
          return;
        }
        text += "*" + fdb.type + "*\n" +
                fdb.text + "\n" +
                "_id:_ " + fdb._id + "\n";
      });

      out(text, channel);
    });
  },

  archiveFeedback: function(id, channel, out) {
    "use strict";
    Feedback.model.findByIdAndUpdate(id, { $set: { archived: true }}, function(err) {
      if (err) {
        out("Echec !", err);
      }
      out("Feedback archivé !", channel);
    });
  },
};

module.exports = Feedback;
