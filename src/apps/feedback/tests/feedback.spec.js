const test = require("tape");

module.exports = function() {
  "use strict";
  test("Feedback - Set up the test", (assert) => {

    assert.pass("This test will pass.");

    assert.end();
  });
};