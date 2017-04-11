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
var headerTask = require( './../lib/tasks/header' );

describe( 'Header tasks', function () {

	var tmpDir = path.join( __dirname, './.tmp' );

	beforeEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );
	afterEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );

	it( 'load properly', function ( done ) {
		senseGo.init( function () {
			expect( senseGo.tasks ).to.have.property( 'header-js:tmp' );
			done();
		} );
	} );

	it( 'Adds the header properly', function ( done ) {
		var gulp = senseGo.gulp;

		var globalConfig = {
			cleanCssTmp: {
				dest: true
			}
		};
		var taskConfig = {
			taskName: 'header',
			src: [
				path.join( __dirname, './fixtures/header/**/*.js' ),
				'!' + path.join( __dirname, './fixtures/header/**/*.min.js' )
			],
			opts: {
				template: '/*! This is <%= pkg.name%> */',
				context: {
					pkg: {
						name: "baz"
					}
				}
			},
			dest: path.join( tmpDir, './header' )
		};
		var plugins = require( './../lib/pluginLoader' );
		var taskUtils = require( './../lib/taskUtils' )( plugins, taskConfig );
		headerTask( gulp, plugins, globalConfig, taskUtils )
			.header( taskConfig, function ( err ) {
				expect( err ).to.not.exist;
				expect( file( path.join( tmpDir, './header/foo.js' ) ) ).to.exist;
				expect( file( path.join( tmpDir, './header/bar.min.js' ) ) ).to.not.exist;
				expect( file( path.join( tmpDir, './header/foo.js' ) ) ).to.contain( '/*! This is baz */' );
				done();
			} );
	} );
} );
