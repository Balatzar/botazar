const express         = require("express");
const expressJWT      = require("express-jwt");
const Report          = require("../../apps/scrum/models/Report");
const secret          = require("../../../private/config").secret;

const app             = express();

const regPublic       = new RegExp("/public/.*"); // for public assets
const regAPI          = new RegExp("/api/.*");    // for public API

app.use(expressJWT({secret: secret}).unless({path: [regPublic, regAPI]}));

app.use(function(request, response, next) {
  "use strict";
  response.header("Access-Control-Allow-Credentials", true);
  response.header("Access-Control-Allow-Origin", request.headers.origin);
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  response.header("Access-Control-Allow-Headers", "X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
});

module.exports = function() {
  "use strict";

  app.get("/api/test", function(req, res) {
    res.send("ok");
  });

  app.get("/scrum/reports", function(req, res) {
    Report.model.find({}, function(err, reports) {
      if (err) {
        console.log(err);
      } else {
        res.json(reports);
      }
    });
  });

  app.get("/api/slackyoutube/login/:id", function(req, res) {
    res.send(req.params.id);
  });

  app.listen(8080, function() {
    console.log("Web server listening on port 8080!");
  });
};
