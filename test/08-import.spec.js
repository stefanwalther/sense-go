/* global describe, beforeEach, afterEach, it */
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

describe('Import tasks', function () {
  const tmpDir = path.join(__dirname, './.tmp');

  beforeEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });
  afterEach(function (done) {
    testUtils.delDir(tmpDir, done);
  });

  it('load properly', function (done) {
    senseGo.init(function () {
      expect(senseGo.tasks).to.have.property('import:fromLocal');
      done();
    });
  });
});
