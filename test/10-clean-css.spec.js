'use strict';

// Core dependencies
const path = require('path');
const fs = require('fs-extra');

// Local dependencies
const SenseGo = require('./../lib/');
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;
const expect = chai.expect;
const testUtils = require('./lib/test-utils');
const cleanCssTask = require('./../lib/tasks/clean-css');

describe('Clean Css tasks', function () {
  let senseGo;
  const tmpDir = path.join(__dirname, './.tmp');
  const expectedDir = path.join(__dirname, './expected');

  beforeEach(function (done) {
    senseGo = new SenseGo();
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
    const gulp = senseGo.gulp;

    const globalConfig = {
      cleanCssTmp: {
        dest: true
      }
    };
    const taskConfig = {
      taskName: 'cleanCss:tmp',
      src: [
        path.join(__dirname, './fixtures/clean-css/**/*.css'),
        '!' + path.join(__dirname, './fixtures/clean-css/**/*.min.css')
      ],
      dest: path.join(tmpDir, './clean-css')
    };
    const plugins = require('./../lib/pluginLoader');
    const taskUtils = require('./../lib/taskUtils')(plugins, taskConfig);
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
    const gulp = senseGo.gulp;

    const globalConfig = {
      cleanCssTmp: {
        dest: true
      }
    };
    const taskConfig = {
      taskName: 'cleanCss:tmp',
      src: [
        path.join(__dirname, './fixtures/clean-css-urls/**/*.css'),
        '!' + path.join(__dirname, './fixtures/clean-css-urls/**/*.min.css')
      ],
      dest: path.join(tmpDir, './clean-css-urls')
    };

    const plugins = require('./../lib/pluginLoader');
    const taskUtils = require('./../lib/taskUtils')(plugins, taskConfig);

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
