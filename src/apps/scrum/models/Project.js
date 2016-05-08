const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  members: [String],
  membersNames: [String],
  archived: { type: Boolean, default: false },
  owner: String,
  ownerName: String,
});

const Project = {
  model: mongoose.model("projects", projectSchema),

  createproject: function(project) {
    "use strict";
    Project.model.create(project);
  },
  
};

module.exports = Project;
