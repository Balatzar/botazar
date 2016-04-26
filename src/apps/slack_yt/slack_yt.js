const youtube = require("youtube-api");
const opn = require("opn");

module.exports = function(arrInput, command, funcOut) {
  "use strict";

  const oauth = youtube.authenticate({
    type: "oauth",
    client_id: process.env.YOUTUBE_CLIENT_ID,
    client_secret: process.env.YOUTUBE_CLIENT_SECRET
  });

  opn(oauth.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtubepartner",
            "https://www.googleapis.com/auth/youtube",
            "https://www.googleapis.com/auth/youtube.force-ssl"]
  }));
  // funcOut("coucou");
};

 // const spotifyApi = new SpotifyWebApi({
 //    clientId : "",
 //    clientSecret : "",
 //    redirectUri : "http://www.example.com/callback"
 //  });

 //  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
 //  .then(function(data) {
 //    console.log('Artist albums', data.body);
 //  }, function(err) {
 //    console.error(err);
 //  });