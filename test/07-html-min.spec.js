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
const htmlMinTask = require('./../lib/tasks/htmlmin');

describe('HtmlMin tasks', function () {
  let senseGo;
  const tmpDir = path.join(__dirname, './.tmp');

  beforeEach(function (done) {
    senseGo = new SenseGo();
    testUtils.delDir(tmpDir, done);
  });
  afterEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });

  it('load properly', function (done) {
    senseGo.init(function () {
      expect(senseGo.tasks).to.have.property('htmlmin:tmp');
      done();
    });
  });

  it('transforms properly', function (done) {
    const gulp = senseGo.gulp;

    const globalConfig = {
      htmlmin: {
        collapseWhitespace: true,
        removeComments: true
      }
    };
    const taskConfig = {
      taskName: 'htmlmin',
      src: path.join(__dirname, './fixtures/html-min/**/*.htm[l]'),
      dest: path.join(tmpDir, './html-min')
    };
    const plugins = require('./../lib/pluginLoader');
    const taskUtils = require('./../lib/taskUtils')(plugins, taskConfig);
    htmlMinTask(gulp, plugins, globalConfig, taskUtils)
      .htmlmin(taskConfig, function (err) {
        expect(err).to.not.exist;
        expect(file(path.join(tmpDir, './html-min/foo.html'))).to.exist;
        expect(file(path.join(tmpDir, './html-min/foo.html'))).to.not.contain('<!-- comment -->');
        expect(file(path.join(tmpDir, './html-min/foo.html'))).to.not.contain('\n');
        done();
      });
  });
});
