/* global describe, beforeEach, afterEach, it */
'use strict';

// Core dependencies
const path = require('path');

// Local dependencies
const SenseGo = require('./../lib/');
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;
const expect = chai.expect;
const testUtils = require('./lib/test-utils');

describe('less tasks (with custom configuration)', function () {
  let senseGo;
  const tmpDir = path.join(__dirname, './.tmp');

  beforeEach(function (done) {
    senseGo = new SenseGo();
    testUtils.delDir(tmpDir, done);
  });
  afterEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });

  it('should run lessEach', function (done) {
    const config = {
      lessEach: {
        src: path.join(__dirname, './fixtures/lessEach/**/*.less'),
        dest: tmpDir
      }
    };

    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.property('less:each');

      senseGo.gulp.series('less:each')(function () {
        expect(file(path.join(__dirname, './.tmp/root.css'))).to.exist;
        expect(file(path.join(__dirname, './.tmp/variables.css'))).to.exist;
        expect(file(path.join(__dirname, './.tmp/whatever.css'))).to.exist;
        done();
      });
    });
  });

  it('should run lessReduce tasks', function (done) {
    const config = {
      lessReduce: {
        src: path.join(__dirname, './fixtures/lessReduce/root.less'),
        dest: tmpDir
      }
    };

    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.property('less:reduce');

      senseGo.gulp.series('less:reduce')(function () {
        expect(file(path.join(__dirname, './.tmp/root.css'))).to.exist;
        done();
      });
    });
  });
});
