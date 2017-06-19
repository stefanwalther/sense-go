'use strict';

var senseGo = require('./../lib/');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var expandTilde = require('expand-tilde');

describe('Configuration', function () {
  describe('deployment', function () {
    it('toLocal.enabled & pathFetching=true will fetch the path on Windows', function (done) {
      var config = {
        deployment: {
          toLocal: {
            enabled: true,
            pathFetching: true
          }
        }
      };

      senseGo.init(config, function (err) {
        expect(err).to.not.exist;
        var cfg = senseGo.getConfig();
        if (process.platform === 'win32') {
          expect(cfg.deployment.toLocal.extensionPath).to.not.be.empty;
        } else {
          expect(cfg.deployment.toLocal.extensionPath).to.be.undefined;
        }
        done();
      });
    });

    it('toLocal.enabled & pathFetching=false will throw and error if localExtensionsBaseDir is not defined', function (done) {
      var config = {
        deployment: {
          toLocal: {
            enabled: true,
            pathFetching: false,
            localExtensionsBaseDir: ''
          }
        }
      };

      senseGo.init(config, function (err) {
        expect(err).to.exist;
        expect(err).to.have.property('message', 'config.deployment.toLocal.localExtensionsBaseDir needs to be defined.');
        done();
      });
    });

    it('toLocal.enabled && pathFetching=false is OK if localExtensionsBaseDir is defined', function (done) {
      var config = {
        deployment: {
          toLocal: {
            enabled: true,
            pathFetching: false,
            localExtensionsBaseDir: '/Documents/Qlik/Sense/Extensions'

          }
        }
      };
      senseGo.init(config, function (err) {
        expect(err).to.be.undefined;
        expect(senseGo.getConfig().deployment.toLocal.extensionBaseDir).equals(config.deployment.toLocal.extensionBaseDir);
        done();
      });
    });

    it('A tilde path (*nix) is resolved correctly', function (done) {
      var config = {
        packageName: 'whatever',
        deployment: {
          toLocal: {
            enabled: true,
            pathFetching: false,
            localExtensionsBaseDir: '~/Documents/Qlik/Sense/Extensions'

          }
        }
      };
      var expected = expandTilde('~/Documents/Qlik/Sense/Extensions');
      senseGo.init(config, function (err) {
        expect(err).to.be.undefined;
        var cfg = senseGo.getConfig();
        expect(cfg.deployment.toLocal.extensionPath).not.to.be.empty;
        expect(senseGo.getConfig().deployment.toLocal.extensionPath).to.have.string(expected);
        done();
      });
    });
  });
});
