'use strict';
/* global describe, it */
const SenseGo = require('./../lib/');
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const expect = chai.expect;
const os = require('os');

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
        expect(err).to.not.exist;
        expect(result).to.be.an('array');
        expect(result[0][0]).to.be.contain('1');
        expect(result[0][1]).to.be.contain('2');
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
        expect(err).to.not.exist;
        expect(result).to.be.an('array');
        expect(result[0]).to.have.length(1);
        expect(result[0][0]).to.be.contain('2');
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
        expect(err).to.not.exist;
        expect(result).to.be.an('array');
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
        expect(err).to.be.undefined;
        expect(result).to.be.an('array').to.be.eql([undefined]);
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
        expect(result).to.be.an('array').to.be.eql([undefined]);
        done();
      });
    });
  });
});
