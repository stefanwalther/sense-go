'use strict';

// Core dependencies
var path = require('path');
var fs = require('fs-extra');

// Local dependencies
var senseGo = require('./../lib/');
var chai = require('chai');
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var file = chaiFiles.file;
var expect = chai.expect;
var testUtils = require('./lib/test-utils');
var _ = require('lodash');

describe('Uglify tasks', function () {
  var tmpDir = path.join(__dirname, './.tmp');

  beforeEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });

  it('uglify:tmp should NOT be included in the pre-built <build> task', function () {
    var defaultConfig = senseGo.loadYml(path.join(__dirname, './../lib/default-config.yml'));
    expect(defaultConfig.taskChains.build).to.not.contain('uglify:tmp');
  });

  it('uglify:tmp should be included in the pre-build <release> task', function () {
    var defaultConfig = senseGo.loadYml(path.join(__dirname, './../lib/default-config.yml'));
    expect(defaultConfig.taskChains.release).to.contain('uglify:tmp');
  });

  it('should minify JavaScript files and ignore already minified files', function (done) {
    var config = {
      uglifyTmp: {
        src: path.join(__dirname, './fixtures/uglify/**/*.js'),
        srcExcluded: path.join(__dirname, './fixtures/uglify/**/*.min.js'),
        dest: tmpDir
      }
    };
    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.property('uglify:tmp');

      senseGo.gulp.series(['uglify:tmp'])(function () {
        expect(file(path.join(tmpDir, './foo.js'))).to.exist;
        expect(file(path.join(tmpDir, './foo.js'))).to.contain('var a=1,b=2,c=3;');
        expect(file(path.join(tmpDir, './foo.min.js'))).to.not.exist;
        done();
      });
    });
  });
});
