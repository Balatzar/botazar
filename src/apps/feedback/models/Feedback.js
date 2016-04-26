const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  type: String,
  text: String,
  archived: { type: Boolean, default: false },
  user: String,
});

const Feedback = {
  model: mongoose.model("Feedback", feedbackSchema),

  createFeedback: function(feedback) {
    "use strict";
    Feedback.model.create(feedback);
  },

  listAll: function(out) {
    "use strict";
    console.log("fdb model");
    Feedback.model.find({ archived: false }, function(err, feedbacks) {
      if (err) {
        return out(err);
      }

      if (!feedbacks.length) {
        return out("Rien pour l'instant magueule !");
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

      out(text);
    });
  },

  archiveFeedback: function(id, out) {
    "use strict";
    Feedback.model.findById(id, function(err, fdb) {
      if (err) {
        return out("Echec !");
      }
      if (fdb === null) {
        return out("Ce feedback n'existe pas !");
      }
      Feedback.model.findByIdAndUpdate(id, { $set: { archived: true }}, function(err) {
        if (err) {
          return out("Echec !");
        }
        out("Feedback archivé !");
      });
    });
  },
};

module.exports = Feedback;
