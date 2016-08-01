'use strict';

// core dependencies
var path = require( 'path' );
var fs = require( 'fs-extra' );

// local dependencies
var senseGo = require( './../lib/' );
var chai = require( 'chai' );
var chaiFiles = require( 'chai-files' );
chai.use( chaiFiles );
var file = chaiFiles.file;
var expect = chai.expect;
var testUtils = require( './lib/test-utils' );
var htmlMinTask = require( './../lib/tasks/htmlmin' );

describe( 'HtmlMin tasks', function () {

	var tmpDir = path.join( __dirname, './.tmp' );

	it( 'load properly', function ( done ) {
		senseGo.init( function () {
			expect( senseGo.tasks ).to.have.property( 'htmlmin:tmp' );
			done();
		} );
	} );

	it.only( 'transforms properly', function ( done ) {
		var gulp = senseGo.gulp;

		var globalConfig = {
			htmlmin: {
				preserveComments: true
			}
		};
		var config = {
			taskName: 'htmlmin',
			src: path.join( __dirname, './fixtures/html-min/**/*.htm[l]' ),
			dest: path.join( __dirname, './.tmp' )
		};
		var plugins = require( './../lib/pluginLoader' );
		var taskUtils = require( './../lib/taskUtils' )( plugins, config );
		htmlMinTask( gulp, plugins, globalConfig, taskUtils )
			.htmlmin( config, function ( x ) {
				console.log('x', x);
				done();
			} );
	} );

} );
