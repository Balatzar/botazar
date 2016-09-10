import * as mongoose from "mongoose";

interface IProject extends mongoose.Document {
  createdAt: Date,
  members: [string],
  membersNames: [string],
  archived: boolean,
  owner: string,
  ownerName: string,
  name: string,
}

const projectSchema: mongoose.Schema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  members: [String],
  membersNames: [String],
  archived: { type: Boolean, default: false },
  owner: String,
  ownerName: String,
  name: String,
});

const Project = {
  model: mongoose.model<IProject>("projects", projectSchema),

  createProject(project) {
    "use strict";
    Project.model.create(project);
  },
  
};

export default Project;
