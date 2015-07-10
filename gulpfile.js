'use strict';
// core deps
var fs = require( 'fs' );

// packages
var gulp = require( 'gulp' );
var senseGo = require( './lib' );
var yaml = require( 'js-yaml' );

var config = yaml.safeLoad( fs.readFileSync( './.sense-go.yml', 'utf8' ) );

senseGo.init( gulp, config);

console.log('params task', gulp.tasks['param']);

