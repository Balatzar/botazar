import * as express         from "express";
import * as expressJWT      from "express-jwt";
const Report          = require("../../apps/scrum/models/Report");
import { secret } from "../../../private/config";

const app             = express();

const regPublic       = new RegExp("/public/*"); // for public assets
const regAPI          = new RegExp("/api/*");    // for public API

app.use(expressJWT({secret: secret}).unless({path: [regPublic, regAPI]}));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Credentials", true);
  response.header("Access-Control-Allow-Origin", request.headers.origin);
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  response.header("Access-Control-Allow-Headers", "X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
});

// TODO put the routes in their app and make a route parser

/**
 * API
 * @namespace
 */
function Api() {
  
  app.get("/api/test", function(req, res) {
    res.send("ok");
  });

  app.get("/api/reports", function(req, res) {
    // TODO change every database calls to async await
    Report.model.find({}, (err, reports) => {
      if (err) {
        res.json(400, err);
      } else {
        res.json(200, reports);
      }
    })
    
  });

  // TODO make a list of codes and a route explaining them

  app.get("/api/slackyoutube/login/:id", function(req, res) {
    res.send(req.params.id);
  });

  // TODO make an https server triggering if we are not in a dev env (with env variable)

  app.listen(8080, function() {
    console.log("Web server listening on port 8080!");
  });
};

module.exports = Api;