const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  id: String,
  created: String,
  creator: String,
  is_archived: Boolean,
  is_general: Boolean,
  has_pins: Boolean,
  members: [],
  topic: [],
  purpose: [],
  name: String,
});

const Channel = {
  model: mongoose.model("channels", channelSchema),

  createChannel: function(channel) {
    "use strict";
    Channel.model.create(channel);
  },
  
};

module.exports = Channel;
