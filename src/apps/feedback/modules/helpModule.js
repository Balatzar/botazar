module.exports = function() {
  "use strict";
  const help =  "This app is to send feedback to the botmaker!\n" +
                "You can you use it with the syntax `feedback|fdb [type] [msg]`\n" +
                "They are 3 types : _idea_, _bug_, _msg_\n" +
                "Example : `botazar feedback idea 'create an app to remind me to commit every now and then'`";

  return help;
};
