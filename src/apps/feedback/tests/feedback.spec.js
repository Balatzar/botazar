const test          = require("tape").test;
const mongoose      = require("mongoose");
const feedbackApp   = require("../feedback");
const Feedback      = require("../models/Feedback");

const mongoURL = process.env.MONGO_URL || "mongodb://localhost/botazartest";

mongoose.connect(mongoURL);

mongoose.connection.on('open', function(){
  mongoose.connection.db.dropDatabase(function (err) {

    "use strict";
    
    test("Feedback - Set up the test", (t) => {

      t.pass("This test will pass.");

      t.end();

    });

    test("Feedback - Help command", (t) => {

      t.plan(2);

      let input           = { command: "-h" };
      let expectedOutput  = "This app is to send feedback to the botmaker!\n" +
                              "You can you use it with the syntax `feedback|fdb [type] [msg]`\n" +
                              "They are 3 types : _idea_, _bug_, _msg_\n" +
                              "Example : `botazar feedback idea 'create an app to remind me to commit every now and then'`"; 

      feedbackApp(input, function(msg) {
        t.equal(msg, expectedOutput, "Testing -h command");
      });

      input.command = "-help";

      feedbackApp(input, function(msg) {
        t.equal(msg, expectedOutput, "Testing -help command");
      });

    });

    test("Feedback - Base command", (t) => {

      t.plan(7);

      let input           = { text: "idea test this module" };

      feedbackApp(input, function(msg) {
        
        t.equal(msg, "Merci gars", "Checking the text output");
        
        Feedback.model.find({}, function(err, feedbacks) {

          const created = feedbacks[0];
          
          t.equal(created.type, "idea", "Checking the object created type");
          t.equal(created.text, "test this module", "Checking the object created text");
          t.equal(created.archived, false, "Checking that the object created is not archived");

          feedbackApp({ text: "idae this should not work" }, function(msg) {

            t.equal(msg, "Type inconnu.", "This type should not be recognized.");

          });

          feedbackApp({ text: "idea " }, function(msg) {

            t.equal(msg, "Il me manque un truc là !", "It should say that it lakes an argument");

          });

          feedbackApp({ text: "" }, function(msg) {

            t.equal(msg, "Il faut du texte !", "It should say that it lakes text");

          });
          
          test("Feedback - List command", (t) => {

            t.plan(1);

            let input         = { command: "-l" };
            let expectedList  = "*" + created.type + "*\n" +
                                created.text + "\n" +
                                "_id:_ " + created._id + "\n";

            feedbackApp(input, function(msg) {
        
              t.equal(msg, expectedList, "Checking the text output");

              test("Feedback - Archive command", (t) => {

                t.plan(3);

                let input           = {
                  command: "-d",
                  text: "571b16b52da6d2922c255d6g",
                };
                let message         = { channel: "test" };

                feedbackApp(input, function(msg) {
        
                  t.equal(msg, "Ce feedback n'existe pas !", "Checking the text output for wrongID");

                  input.text      = created._id;

                  feedbackApp(input, function(msg) {
        
                    t.equal(msg, "Feedback archivé !", "Checking the text output for rightID");

                    input.command   = "-list";

                    feedbackApp(input, function(msg) {
        
                      t.equal(msg, "Rien pour l'instant magueule !", "Checking the text output for empty list");

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
