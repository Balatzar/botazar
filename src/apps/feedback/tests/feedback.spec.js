const test          = require("tape");
const feedbackApp   = require("../feedback");

"use strict";

test("Feedback - Set up the test", (t) => {

  t.pass("This test will pass.");

  t.end();

});

test("Feedback - Help command - Good argument", (t) => {

  t.plan(1)

  const input           = { command: "-h" };
  const message         = { channel: test };
  const expectedOutput  = "This app is to send feedback to the botmaker!\n" +
                          "You can you use it with the syntax `feedback|fdb [type] [msg]`\n" +
                          "They are 3 types : _idea_, _bug_, _msg_\n" +
                          "Example : `botazar feedback idea 'create an app to remind me to commit every now and then'`"; 

  feedbackApp(input, message, function(msg, channel) {
    console.log("in cb")
    t.equal(msg, expectedOutput);
  })

});
