module.exports = function(arrInput, objMessage, funcOut) {
  "use strict";

  const regex = new RegExp("^(<https\\:\\/\\/)?(www\\.youtube\\.com|youtu\\.?be)\\/.+$");

  arrInput.forEach(str => {
    if (regex.test(str)) {
      const index = str.indexOf("v=") + 2;
      const videoId = str.substring(index, index + 11);

      
    }
  });

  funcOut("coucou");
};
