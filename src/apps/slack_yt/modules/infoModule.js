const Playlist = require("../models/Playlist");

module.exports = function(objMessage, funcOut) {
  "use strict";
  Playlist.model.findOne({ channel: objMessage.channel }, function(err, playlist) {
    if (err) {
      console.log(err);
    } else {
      const strSuccess = "yo ! ta playlist est ici " + playlist.url;
      const strFail = "errr sorry pas de playlist ici.";
      funcOut(playlist.url ? strSuccess : strFail);
    }
  });
};
