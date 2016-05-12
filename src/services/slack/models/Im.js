const mongoose = require("mongoose");

const imSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  id: String,
  is_im: Boolean,
  user: String,
  created: Number,
  is_org_shared: Boolean,
  has_pins: Boolean,
  last_read: String,
  latest: String,
  unread_count: Number,
  unread_count_display: Number,
  is_open: Boolean
});

const Im = {
  model: mongoose.model("ims", imSchema),

  createIm: function(im) {
    "use strict";
    Im.model.create(im);
  },
  
};

module.exports = Im;
