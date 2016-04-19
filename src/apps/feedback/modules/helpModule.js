module.exports = function() {
  "use strict";
  const help =  "This app is used for sending feedback to the botmaker!\n" +
              "You can you use it with the syntax `feedback [type] [msg]\n" +
              "They are 3 types : idea, bug, msg\n" +
              "Example : `/balt feedback idea 'create an app to remind me to commit every now and then'`";

  return help;
};
