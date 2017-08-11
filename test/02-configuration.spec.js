/*global describe, it */
'use strict';

const senseGo = require('./../lib/');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const expandTilde = require('expand-tilde');

describe('Configuration', function () {
  describe('deployment', function () {
    it('toLocal.enabled & pathFetching=true will fetch the path on Windows', function (done) {
      const config = {
        deployment: {
          toLocal: {
            enabled: true,
            pathFetching: true
          }
        }
      };

      senseGo.init(config, function (err) {
        expect(err).to.not.exist;
        const cfg = senseGo.getConfig();
        if (process.platform === 'win32') {
          expect(cfg.deployment.toLocal.extensionPath).to.not.be.empty;
        } else {
          expect(cfg.deployment.toLocal.extensionPath).to.be.undefined;
        }
        done();
      });
    });

    it('toLocal.enabled & pathFetching=false will throw and error if localExtensionsBaseDir is not defined', function (done) {
      const config = {
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
      const config = {
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
      const config = {
        packageName: 'whatever',
        deployment: {
          toLocal: {
            enabled: true,
            pathFetching: false,
            localExtensionsBaseDir: '~/Documents/Qlik/Sense/Extensions'

          }
        }
      };
      const expected = expandTilde('~/Documents/Qlik/Sense/Extensions');
      senseGo.init(config, function (err) {
        expect(err).to.be.undefined;
        const cfg = senseGo.getConfig();
        expect(cfg.deployment.toLocal.extensionPath).not.to.be.empty;
        expect(senseGo.getConfig().deployment.toLocal.extensionPath).to.have.string(expected);
        done();
      });
    });
  });
});
