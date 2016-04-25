module.exports = function(input, message, out) {
  "use strict";
  const reg = new RegExp("^(<https\\:\\/\\/)?(www\\.youtube\\.com|youtu\\.?be)\\/.+$");
  let text = input.text.split(" ");
  console.log(input.command)
  text.forEach(e => console.log(e));
}