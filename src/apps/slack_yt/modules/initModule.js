const google = require("googleapis");
const Tokens = require("../models/Tokens");
const Playlist = require("../models/Playlist");
const OAuth2 = google.auth.OAuth2;
const youtube = google.youtube("v3");

const oauth2Client = new OAuth2(process.env.GOOGLE_API_CLIENTID, process.env.GOOGLE_API_CLIENTSECRET, "http://balthazar.space");

module.exports = function(objMessage, funcOut) {
  "use strict";

  Tokens.model.find({}, function(err, token) {
    if (err) {
      funcOut(JSON.stringify(err));
    } else {
      const tokens = token[0];

      oauth2Client.setCredentials(tokens);

      youtube.playlists.insert({
        "part": "snippet,status",
        resource: {
          snippet: {
            title: "Botazar playlist",
            description: "A playlist created with the YouTube API and botazar"
          },
          "status": {
            "privacyStatus": "public"
           }
        },
        auth: oauth2Client
      }, function(err, res) {
        if (err) {
          funcOut(JSON.stringify(err));
        } else {
          Playlist.createPlaylist({
            id: res.id,
            channel: objMessage.channel,
            title: "Botazar playlist"
          });
          funcOut("Votre playlist est ici ! https://www.youtube.com/playlist?list=" + res.id);
        }
      });
    }
  });

};
