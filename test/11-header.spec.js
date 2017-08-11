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
const headerTask = require('./../lib/tasks/header');

describe('Header tasks', function () {
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
      expect(senseGo.tasks).to.have.property('header-js:tmp');
      done();
    });
  });

  it('Adds the header properly', function (done) {
    const gulp = senseGo.gulp;

    const globalConfig = {
      cleanCssTmp: {
        dest: true
      }
    };
    const taskConfig = {
      taskName: 'header',
      src: [
        path.join(__dirname, './fixtures/header/**/*.js'),
        '!' + path.join(__dirname, './fixtures/header/**/*.min.js')
      ],
      opts: {
        template: '/*! This is <%= pkg.name%> */',
        context: {
          pkg: {
            name: 'baz'
          }
        }
      },
      dest: path.join(tmpDir, './header')
    };
    const plugins = require('./../lib/pluginLoader');
    const taskUtils = require('./../lib/taskUtils')(plugins, taskConfig);
    headerTask(gulp, plugins, globalConfig, taskUtils)
      .header(taskConfig, function (err) {
        expect(err).to.not.exist;
        expect(file(path.join(tmpDir, './header/foo.js'))).to.exist;
        expect(file(path.join(tmpDir, './header/bar.min.js'))).to.not.exist;
        expect(file(path.join(tmpDir, './header/foo.js'))).to.contain('/*! This is baz */');
        done();
      });
  });
});
