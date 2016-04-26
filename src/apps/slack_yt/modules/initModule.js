const google = require("googleapis");
const Tokens = require("../models/Tokens");
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
        "part": "snippet",
        resource: {
          snippet: {
            title: "Test Playlist",
            description: "A private playlist created with the YouTube API"
          },
        },
        auth: oauth2Client
      });
    }
  });

};
