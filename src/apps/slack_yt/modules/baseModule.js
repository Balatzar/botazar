const google = require("googleapis");
const Tokens = require("../models/Tokens");
const Playlist = require("../models/Playlist");

const youtube = google.youtube("v3");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(process.env.GOOGLE_API_CLIENTID, process.env.GOOGLE_API_CLIENTSECRET, "http://balthazar.space");

module.exports = function(arrInput, objMessage, funcOut) {
  "use strict";

  const regex = new RegExp("^(<https\\:\\/\\/)?(www\\.youtube\\.com|youtu\\.?be)\\/.+$");

  arrInput.forEach(str => {
    if (regex.test(str)) {
      const intIndex = str.indexOf("v=") !== -1 ? str.indexOf("v=") + 2 : str.indexOf("be/") + 3;
      const strVideoId = str.substring(intIndex, intIndex + 11);

      const funcGetTokensAndSendPlaylist = function(strPlaylistId) {

        Tokens.model.find({}, function(err, token) {
          if (err) {
            funcOut(JSON.stringify(err));
          } else {
            const tokens = token[0];

            oauth2Client.setCredentials(tokens);

            youtube.playlistItems.insert({
              "part": "snippet",
              resource: {
               "snippet": {
                "playlistId": strPlaylistId,
                "resourceId": {
                 "videoId": strVideoId,
                 "kind": "youtube#video"
                },
                "position": 0
               },
             },
              "auth": oauth2Client
            });

          }
        });

      };

      Playlist.findCurrentPlaylist(objMessage.channel, funcGetTokensAndSendPlaylist);

    }
  });
};

/*

trouver la playlist correspondant au channel depuis lequel la vidéo est envoyée
récupérer les tokens
ajouter la vidéo a la playlist sur yt

*/
