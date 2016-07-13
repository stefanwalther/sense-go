'use strict';
var path = require('path');
var senseGo = require('./lib/');
var gulp = senseGo.gulp; // Get the reference to the gulp instance used in sense-go

var userConfig = senseGo.loadYml( path.join(__dirname, '.sense-go.yml'));

senseGo.init( userConfig, function () {
	
});
