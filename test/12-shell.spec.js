'use strict';
/* global describe, it */
// Core dependencies
const path = require('path');
const fs = require('fs-extra');

// Local dependencies
const SenseGo = require('./../lib/');
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const expect = chai.expect;

describe('Shell Tasks', () => {
  let senseGo;

  beforeEach(() => {
    senseGo = new SenseGo();
  });

  it('Should return basic shell commands', done => {
    const config = {
      shell: {
        enabled: true,
        tasks: [
          {
            enabled: true,
            cmd: 'echo 1'
          },
          {
            enabled: true,
            cmd: 'echo 2'
          }
        ]
      }
    };

    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.a.property('shell');

      senseGo.gulp.series('shell')((err, result) => {
        expect(result).to.be.an.array;
        expect(result[0][0]).to.be.equal('1\n');
        expect(result[0][1]).to.be.equal('2\n');
        done();
      });
    });
  });

  it('should allow to disable each of the commands', done => {
    const config = {
      shell: {
        enabled: true,
        tasks: [
          {
            enabled: false,
            cmd: 'echo 1'
          },
          {
            enabled: true,
            cmd: 'echo 2'
          }
        ]
      }
    };
    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.a.property('shell');

      senseGo.gulp.series('shell')((err, result) => {
        expect(result).to.be.an.array;
        expect(result[0]).to.have.length(1);
        expect(result[0][0]).to.be.equal('2\n');
        done();
      });
    });
  });

  it('should enable each of the tasks by default', done => {
    const config = {
      shell: {
        enabled: true,
        tasks: [
          {
            cmd: 'echo 1'
          },
          {
            cmd: 'echo 2'
          }
        ]
      }
    };
    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.a.property('shell');

      senseGo.gulp.series('shell')((err, result) => {
        expect(result).to.be.an.array;
        expect(result[0]).to.have.length(2);
        done();
      });
    });
  });

  it('can be disabled at all', done => {
    const config = {
      shell: {
        enabled: false,
        tasks: [
          {
            cmd: 'echo 1'
          }
        ]
      }
    };
    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.a.property('shell');

      senseGo.gulp.series('shell')((err, result) => {
        expect(result).not.to.be.an.array;
        done();
      });
    });
  });

  it('works if no tasks are defined', done => {
    const config = {
      shell: {
        enabled: true
      }
    };

    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.a.property('shell');

      senseGo.gulp.series('shell')((err, result) => {
        console.log('error', err);
        expect(result).not.to.be.an.array;
        done();
      });
    });
  });
});
