/*global describe, beforeEach, it */
'use strict';

// Core dependencies
const path = require('path');
const fs = require('fs-extra');

// Local dependencies
const senseGo = require('./../lib/');
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;
const expect = chai.expect;
const testUtils = require('./lib/test-utils');
const _ = require('lodash');

describe('Uglify tasks', function () {
  const tmpDir = path.join(__dirname, './.tmp');

  beforeEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });

  it('uglify:tmp should NOT be included in the pre-built <build> task', function () {
    const defaultConfig = senseGo.loadYml(path.join(__dirname, './../lib/default-config.yml'));
    expect(defaultConfig.taskChains.build).to.not.contain('uglify:tmp');
  });

  it('uglify:tmp should be included in the pre-build <release> task', function () {
    const defaultConfig = senseGo.loadYml(path.join(__dirname, './../lib/default-config.yml'));
    expect(defaultConfig.taskChains.release).to.contain('uglify:tmp');
  });

  it('should minify JavaScript files and ignore already minified files', function (done) {
    const config = {
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
