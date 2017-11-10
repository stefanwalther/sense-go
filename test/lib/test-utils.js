'use strict';

const del = require('del');

const TestUtils = function () {
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
