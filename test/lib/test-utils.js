'use strict';

// Local dependencies
var del = require('del');

var TestUtils = function () {
  function delDir(dir, done) {
    del(dir).then(function () {
      done();
    });
  }

  return {
    delDir: delDir
  };
};
module.exports = new TestUtils();
