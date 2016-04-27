const google = require("googleapis");
const Tokens = require("../models/Tokens");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(process.env.GOOGLE_API_CLIENTID, process.env.GOOGLE_API_CLIENTSECRET, "http://balthazar.space");

module.exports = function(arrInput, funcOut) {
  "use strict";

  Tokens.model.find({}, function(err, tokens) {
    if (err) {
      console.log(err);
    } else if (tokens.length) {
      funcOut("non non non t'es déjà authentifié c'est bon");
    } else {
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
          const scope = "https://www.googleapis.com/auth/youtube";

          const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scope,
            prompt: "consent"
          });

          funcOut("veuillez autoriser l'application et me filer le code en faisant :\n" +
                  "`botazar sly -c code [codetoutbizare]`\n" +
                  "le code est dans l'url après `http://balthazar.space/?code=`!");
          funcOut(url);
      }
    }
  });
};
