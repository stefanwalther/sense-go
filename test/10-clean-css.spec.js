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
var cleanCssTask = require('./../lib/tasks/clean-css');

describe('Clean Css tasks', function () {
  var tmpDir = path.join(__dirname, './.tmp');
  var expectedDir = path.join(__dirname, './expected');

  beforeEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });
  afterEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });

  it('load properly', function (done) {
    senseGo.init(function () {
      expect(senseGo.tasks).to.have.property('cleanCss:tmp');
      done();
    });
  });

  it('transforms properly', function (done) {
    var gulp = senseGo.gulp;

    var globalConfig = {
      cleanCssTmp: {
        dest: true
      }
    };
    var taskConfig = {
      taskName: 'cleanCss:tmp',
      src: [
        path.join(__dirname, './fixtures/clean-css/**/*.css'),
        '!' + path.join(__dirname, './fixtures/clean-css/**/*.min.css')
      ],
      dest: path.join(tmpDir, './clean-css')
    };
    var plugins = require('./../lib/pluginLoader');
    var taskUtils = require('./../lib/taskUtils')(plugins, taskConfig);
    cleanCssTask(gulp, plugins, globalConfig, taskUtils)
      .cleanCss(taskConfig, function (err) {
        expect(err).to.not.exist;
        expect(file(path.join(tmpDir, './clean-css/foo.min.css'))).to.exist;
        expect(file(path.join(tmpDir, './clean-css/foo.css'))).to.not.exist;
        expect(file(path.join(tmpDir, './clean-css/foo.min.css'))).to.contain('div{color:#000}');
        expect(file(path.join(tmpDir, './clean-css/bar.min.css'))).to.not.exist;
        done();
      });
  });

  // Make sure that URLs are not transformed (which happened with a new version of clean-css
  //   ==> this then potentially breaks every extension ...
  it('does not transform URLs', function (done) {
    var gulp = senseGo.gulp;

    var globalConfig = {
      cleanCssTmp: {
        dest: true
      }
    };
    var taskConfig = {
      taskName: 'cleanCss:tmp',
      src: [
        path.join(__dirname, './fixtures/clean-css-urls/**/*.css'),
        '!' + path.join(__dirname, './fixtures/clean-css-urls/**/*.min.css')
      ],
      dest: path.join(tmpDir, './clean-css-urls')
    };

    var plugins = require('./../lib/pluginLoader');
    var taskUtils = require('./../lib/taskUtils')(plugins, taskConfig);

    cleanCssTask(gulp, plugins, globalConfig, taskUtils)
      .cleanCss(taskConfig, function (err) {
        expect(err).to.not.exist;
        expect(file(path.join(tmpDir, './clean-css-urls/test.min.css'))).to.exist;
        expect(file(path.join(tmpDir, './clean-css-urls/test.css'))).to.not.exist;
        expect(file(path.join(tmpDir, './clean-css-urls/test.min.css'))).to.equal(file(path.join(expectedDir, 'clean-css-urls/', 'test.min.css')));
        done();
      });
  });
});
