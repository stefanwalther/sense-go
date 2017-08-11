'use strict';
const fs = require('fs-extra');
const SenseGo = require('./../lib/');
const path = require('path');
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;
const expect = chai.expect;
const testUtils = require('./lib/test-utils');
const cleanTask = require('./../lib/tasks/clean');

describe('Clean tasks', function () {
  let senseGo;
  const tmpDir = path.join(__dirname, './.tmp');

  beforeEach(function (done) {
    senseGo = new SenseGo();
    testUtils.delDir(tmpDir, done);
  });
  afterEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });

  describe('Core method', function () {
    it('should clean the entire directory', function (done) {
      const gulp = senseGo.gulp;
      fs.copy(path.join(__dirname, './fixtures/clean'), tmpDir, function (err) {
        if (err) {
          return console.error(err);
        }
        const taskConfig = {
          taskName: 'test:',
          src: path.join(tmpDir, './**/*.*')
        };
        const delOptions = {};
        cleanTask(gulp)
        // eslint-disable-next-line max-nested-callbacks
          .clean(taskConfig, delOptions, function () {
            expect(file(path.join(tmpDir, './foo.js'))).to.not.exist;
            expect(file(path.join(tmpDir, './bar.js'))).to.not.exist;
            expect(file(path.join(tmpDir, './baz.js'))).to.not.exist;
            done();
          });
      });
    });
  });
});
