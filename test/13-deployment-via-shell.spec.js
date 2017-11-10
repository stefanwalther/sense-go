'use strict';

/* global describe, it */
// Core dependencies
const path = require('path');
const fs = require('fs-extra');

// Local dependencies
const chai = require('chai');
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const expect = chai.expect;
const SenseGo = require('./../lib/');

describe('Deployment.viaShell', () => {
  let senseGo;
  beforeEach(() => {
    senseGo = new SenseGo();
  });

  it('should not do anything if disabled', done => {
    const config = {
      deployment: {
        viaShell: {
          enabled: false
        }
      }
    };

    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.a.property('deploy:viaShell');

      senseGo.gulp.series('deploy:viaShell')((err, result) => {
        expect(err).to.not.exist;
        expect(result).to.be.an('array');
        expect(result[0]).to.not.exist;
        done();
      });
    });
  });

  it('should run a single command in root', done => {
    const config = {
      deployment: {
        viaShell: {
          enabled: true,
          cmd: 'echo 1'
        }
      }
    };

    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.a.property('deploy:viaShell');

      senseGo.gulp.series('deploy:viaShell')((err, result) => {
        expect(err).to.be.undefined;
        expect(result[0][0]).to.be.equal('1\n');
        done();
      });
    });
  });

  it('should run if an array of commands is defined', done => {
    const config = {
      deployment: {
        viaShell: {
          enabled: true,
          commands: [
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
      }
    };

    senseGo.init(config, function (err) {
      expect(err).to.be.undefined;
      expect(senseGo.gulp._registry._tasks).not.to.be.null;
      expect(senseGo.gulp._registry._tasks).to.have.a.property('deploy:viaShell');

      senseGo.gulp.series('deploy:viaShell')((err, result) => {
        expect(err).to.be.undefined;
        expect(result[0][0]).to.be.equal('1\n');
        expect(result[0][1]).to.be.equal('2\n');
        done();
      });
    });
  });
});
