const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  first: String,
  second: String,
  third: String,
  user: String,
  project: String,
  editing: { type: Boolean, default: true },
});

const Report = {
  model: mongoose.model("reports", reportSchema),

  createReport: function(report) {
    "use strict";
    Report.model.create(report);
  },

};

module.exports = Report;
