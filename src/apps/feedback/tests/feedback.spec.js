const test          = require("tape").test;
const mongoose      = require("mongoose");
const feedbackApp   = require("../feedback");
const Feedback      = require("../models/Feedback");

const mongoURL = "mongodb://localhost/botazartest";

mongoose.connect(mongoURL);

mongoose.connection.on('open', function(){
  mongoose.connection.db.dropDatabase(function (err) {

    "use strict";
    
    test("Feedback - Set up the test", (t) => {

      t.pass("This test will pass.");

      t.end();

    });

    test("Feedback - Help command", (t) => {

      t.plan(4);

      let input           = { command: "-h" };
      let message         = { channel: "test" };
      let expectedOutput  = "This app is to send feedback to the botmaker!\n" +
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

      t.plan(9);

      let input           = { text: "idea test this module" };
      let message         = { channel: "test" };

      feedbackApp(input, message, function(msg, channel) {
        
        t.equal(msg, "Merci gars", "Checking the text output");
        t.equal(channel, message.channel, "channel is not modified");
        
        Feedback.model.find({}, function(err, feedbacks) {

          const created = feedbacks[0];
          
          t.equal(created.type, "idea", "Checking the object created type");
          t.equal(created.text, "test this module", "Checking the object created text");
          t.equal(created.archived, false, "Checking that the object created is not archived");

          feedbackApp({ text: "idae this should not work" }, message, function(msg, channel) {

            t.equal(msg, "Type inconnu.", "This type should not be recognized.");
            t.equal(channel, message.channel, "channel is not modified");

          });

          feedbackApp({ text: "idea " }, message, function(msg, channel) {

            t.equal(msg, "Il me manque un truc là !", "It should say that it lakes an argument");
            t.equal(channel, message.channel, "channel is not modified");

          });
          
          test("Feedback - List command", (t) => {

            t.plan(2);

            let input         = { command: "-l" };
            let message       = { channel: "test" };
            let expectedList  = "*" + created.type + "*\n" +
                                created.text + "\n" +
                                "_id:_ " + created._id + "\n";

            feedbackApp(input, message, function(msg, channel) {
        
              t.equal(msg, expectedList, "Checking the text output");
              t.equal(channel, message.channel, "channel is not modified");

              test("Feedback - Archive command", (t) => {

                t.plan(6);

                let input           = {
                  command: "-d",
                  text: "571b16b52da6d2922c255d6g",
                };
                let message         = { channel: "test" };

                feedbackApp(input, message, function(msg, channel) {
        
                  t.equal(msg, "Ce feedback n'existe pas !", "Checking the text output for wrongID");
                  t.equal(channel, message.channel, "channel is not modified");

                  input.text      = created._id;

                  feedbackApp(input, message, function(msg, channel) {
        
                    t.equal(msg, "Feedback archivé !", "Checking the text output for rightID");
                    t.equal(channel, message.channel, "channel is not modified");

                    input.command   = "-list";

                    feedbackApp(input, message, function(msg, channel) {
        
                      t.equal(msg, "Rien pour l'instant magueule !", "Checking the text output for empty list");
                      t.equal(channel, message.channel, "channel is not modified");

                      mongoose.disconnect();

                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
