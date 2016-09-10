import * as mongoose from "mongoose";
const generate = require("../../../helpers/generateCode");

const userSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  id: String,
  team_id: String,
  name: String,
  deleted: Boolean,
  status: String,
  color: String,
  real_name: String,
  tz: String,
  tz_label: String,
  tz_offset: Number,
  profile: [],
  is_admin: Boolean,
  is_owner: Boolean,
  is_primary_owner: Boolean,
  is_restricted: Boolean,
  is_ultra_restricted: Boolean,
  is_bot: Boolean,
  presence: String,
  code: String,
});

const User = {
  model: mongoose.model("users", userSchema),

  createUser: function(user) {
    "use strict";
    user.code = generate(user.name);
    User.model.create(user);
  },
  
};

export default User;
