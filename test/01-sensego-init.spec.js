/* global describe, it */
'use strict';

const gulp = require('gulp');
const senseGo = require('./../lib/');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;

describe('sense-go', function () {
  it('should take packageName from package.json by default', function (done) {
    senseGo.init({}, function (err) {
      expect(err).to.not.exist;
      expect(senseGo.getConfig().packageName).to.be.equal('sense-go');
      done();
    });
  });

  it('should have some default options', function (done) {
    senseGo.init({packageName: 'whatever'}, function (err) {
      expect(err).to.not.exist;
      expect(gulp._registry._tasks).not.to.be.null;
      expect(gulp._registry._tasks).to.have.deep.property('all');
      done();
    });
  });

  it('should contain default configuration', function (done) {
    senseGo.init({packageName: 'whatever'}, function (err) {
      expect(err).to.not.exist;
      const cfg = senseGo.getConfig();
      expect(cfg).not.to.be.undefined;
      expect(cfg).to.have.property('debugOutput');
      expect(cfg).to.have.property('packageName', 'whatever');
      done();
    });
  });
});
