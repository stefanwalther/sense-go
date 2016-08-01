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

describe.only( 'HtmlMin tasks', function () {

	var tmpDir = path.join( __dirname, './.tmp' );

	beforeEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );
	afterEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );

	it( 'load properly', function ( done ) {
		senseGo.init( function () {
			expect( senseGo.tasks ).to.have.property( 'htmlmin:tmp' );
			done();
		} );
	} );

	it( 'transforms properly', function ( done ) {
		var gulp = senseGo.gulp;

		var globalConfig = {
			htmlmin: {
				collapseWhitespace: true,
				removeComments: true
			}
		};
		var taskConfig = {
			taskName: 'htmlmin',
			src: path.join( __dirname, './fixtures/html-min/**/*.htm[l]' ),
			dest: path.join( tmpDir, './html-min' )
		};
		var plugins = require( './../lib/pluginLoader' );
		var taskUtils = require( './../lib/taskUtils' )( plugins, taskConfig );
		htmlMinTask( gulp, plugins, globalConfig, taskUtils )
			.htmlmin( taskConfig, function ( err ) {
				expect( err ).to.not.exist;
				expect( file( path.join( tmpDir, './html-min/foo.html' ) ) ).to.exist;
				expect( file( path.join( tmpDir, './html-min/foo.html' ) ) ).to.not.contain( '<!-- comment -->' );
				expect( file( path.join( tmpDir, './html-min/foo.html' ) ) ).to.not.contain( '\n' );
				done();
			} );
	} );

} );
