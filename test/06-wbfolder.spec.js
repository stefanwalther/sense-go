'use strict';

const SenseGo = require('./../lib/');
const path = require('path');
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;
const expect = chai.expect;
const testUtils = require('./lib/test-utils');

describe('wbfolder', function () {
  let senseGo;
  const tmpDir = path.join(__dirname, './.tmp');

  beforeEach(function (done) {
    senseGo = new SenseGo();
    testUtils.delDir(tmpDir, done);
  });

  it('should create a wbfolder.wbl using the `wbl` task', function (done) {
    const config = {
      tmpDir: tmpDir,
      wbfolder: {
        enabled: true,
        cwd: path.join(__dirname, './fixtures/wbfolder'),
        src: './**/*.*',
        dest: path.join(tmpDir, './wbfolder.wbl')
      }
    };
    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.property('wbfolder:tmp');

      senseGo.gulp.series(['copy:toTmp', 'wbfolder:tmp'])(function () {
        expect(file(path.join(tmpDir, './wbfolder.wbl'))).to.exist;
        done();
      });
    });
  });

  it('should not create a wbfolder.wbl using the `wbl` task not enabled', function (done) {
    const config = {
      wbfolder: {
        enabled: true,
        cwd: path.join(__dirname, './fixtures/wbfolder'),
        src: './**/*.*',
        dest: path.join(tmpDir, './wbfolder.wbl')
      }
    };
    config.wbfolder.enabled = false;
    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.tasks).not.to.be.null;
      expect(senseGo.tasks).to.have.property('wbfolder:tmp');

      senseGo.gulp.series(['copy:toTmp', 'wbfolder:tmp'])(function () {
        expect(file(path.join(tmpDir, './wbfolder.wbl'))).to.not.exist;
        done();
      });
    });
  });
});
