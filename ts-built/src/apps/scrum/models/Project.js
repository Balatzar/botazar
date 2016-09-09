var mongoose = require("mongoose");
var projectSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    members: [String],
    membersNames: [String],
    archived: { type: Boolean, default: false },
    owner: String,
    ownerName: String,
    name: String,
});
var Project = {
    model: mongoose.model("projects", projectSchema),
    createProject: function (project) {
        "use strict";
        Project.model.create(project);
    },
};
module.exports = Project;
