const express = require("express");
const Report  = require("../../apps/scrum/models/Report");
const app     = express();

app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Credentials', true);
  response.header('Access-Control-Allow-Origin', request.headers.origin);
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

module.exports = function() {
  "use strict";

  app.get("/scrum/reports", function (req, res) {
    Report.model.find({}, function(err, reports) {
      if (err) {
        console.log(err);
      } else {
        res.json(reports);
      }
    });
  });

  app.listen(3000, function () {
    console.log("Web server listening on port 3000!");
  });
};
