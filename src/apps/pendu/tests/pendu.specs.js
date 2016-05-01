const test          = require("tape").test;
const mongoose      = require("mongoose");
const penduApp      = require("../pendu");

const mongoURL = process.env.MONGO_URL || "mongodb://localhost/botazartest";

mongoose.connect(mongoURL);

mongoose.connection.on('open', function(){

  "use strict";
  
  test("Pendu - Set up the test", (t) => {

    t.pass("This test will pass.");

    t.end();

  });

  test("Pendu - ", (t) => {

    const objMessage = {
      channel: "test",
      user: "tester",
    };

    penduApp([], "", objMessage, function(msg) {

      t.equal(typeof msg, "string", "msg should be a string");

      t.pass();
      t.end();

      mongoose.disconnect();

    });

  });
});
