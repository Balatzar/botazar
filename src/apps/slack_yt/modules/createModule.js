const google = require("googleapis");
const Tokens = require("../models/Tokens");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(process.env.GOOGLE_API_CLIENTID, process.env.GOOGLE_API_CLIENTSECRET, "http://balthazar.space");

module.exports = function(arrInput, funcOut) {
  "use strict";
  if (arrInput.length) {
    if (arrInput[0] === "code") {
      const code = arrInput[1];

      oauth2Client.getToken(code, function(err, tokens) {
        if (err) {
          funcOut(JSON.stringify(err));
          console.log(err);
        } else {
          Tokens.createTokens(tokens);
        }
      });
    }
  } else {
      const scopes = ["https://www.googleapis.com/auth/youtubepartner",
                      "https://www.googleapis.com/auth/youtube",
                      "https://www.googleapis.com/auth/youtube.force-ssl"];

      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        prompt: "consent"
      });

      funcOut("Veuillez autoriser l'application et me filer le code en faisant :\n" +
              "`botazar sly -c code erg3er1h3e2r1h3e2r13er1g32e`\n" +
              "Le code est dans l'url après `http://balthazar.space/?code=`!");
      funcOut(url);
  }
};
