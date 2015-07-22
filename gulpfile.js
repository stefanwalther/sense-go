'use strict';
var gulp = require('gulp');
var senseGo = require('./lib/');

var userConfig = {
	"packageName": "sense-go"
};

senseGo.init( gulp, userConfig,  function (  ) {

});
