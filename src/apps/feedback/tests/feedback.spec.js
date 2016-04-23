const test          = require("tape").test;
const mongoose      = require("mongoose");
const feedbackApp   = require("../feedback");
const Feedback      = require("../models/Feedback");

"use strict";

const mongoURL = "mongodb://localhost/botazartest";

mongoose.connect(mongoURL);

mongoose.connection.on('open', function(){
   mongoose.connection.db.dropDatabase(function (err) {
    
    test("Feedback - Set up the test", (t) => {

      t.pass("This test will pass.");

      t.end();

    });

    test("Feedback - Help command", (t) => {

      t.plan(4);

      const input           = { command: "-h" };
      const message         = { channel: "test" };
      const expectedOutput  = "This app is to send feedback to the botmaker!\n" +
                              "You can you use it with the syntax `feedback|fdb [type] [msg]`\n" +
                              "They are 3 types : _idea_, _bug_, _msg_\n" +
                              "Example : `botazar feedback idea 'create an app to remind me to commit every now and then'`"; 

      feedbackApp(input, message, function(msg, channel) {
        t.equal(msg, expectedOutput, "Testing -h command");
        t.equal(channel, message.channel, "channel is not modified");
      });

      input.command = "-help";

      feedbackApp(input, message, function(msg, channel) {
        t.equal(msg, expectedOutput, "Testing -help command");
        t.equal(channel, message.channel, "channel is not modified");
      });

    });

    test("Feedback - Base command", (t) => {

      t.plan(5);

      const input           = { text: "idea test this module" };
      const message         = { channel: "test" };
      const expectedOutput  = "Merci gars";

      feedbackApp(input, message, function(msg, channel) {
        
        t.equal(msg, expectedOutput, "Checking the text output");
        t.equal(channel, message.channel, "channel is not modified");
        
        Feedback.model.find({}, function(err, feedbacks) {

          const created = feedbacks[0];
          
          t.equal(created.type, "idea", "Checking the object created type");
          t.equal(created.text, "test this module", "Checking the object created text");
          t.equal(created.archived, false, "Checking that the object created is not archived");
          
          test("Feedback - List command", (tt) => {

            tt.plan(2);

            const input           = { command: "-l" };
            const message         = { channel: "test" };
            const expectedOutput  = "*" + created.type + "*\n" +
                                    created.text + "\n" +
                                    "_id:_ " + created._id + "\n";

            feedbackApp(input, message, function(msg, channel) {
        
              tt.equal(msg, expectedOutput, "Checking the text output");
              tt.equal(channel, message.channel, "channel is not modified");

              mongoose.disconnect();

            });

          });
        });
      });
    });
  });
});
