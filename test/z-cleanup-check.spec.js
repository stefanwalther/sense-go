'use strict';

// Core dependencies
const path = require('path');
const fs = require('fs-extra');

// Local dependencies
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;
const dir = chaiFiles.dir;
const expect = chai.expect;

describe('After all tests', function () {
  it('There is no .tmp directory in root', function () {
    expect(dir(path.join(__dirname, './tmp'))).to.not.exist;
  });

  it('There is no .tmp directory in test', function () {
    expect(dir(path.join(__dirname, './test/.tmp'))).to.not.exist;
  });
});
