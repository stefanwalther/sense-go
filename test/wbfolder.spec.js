'use strict';

var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var rimraf = require( 'rimraf' );
chai.use( require( 'chai-fs' ) );
var expect = chai.expect;
var testUtils = require('./lib/test-utils');

describe( 'wbfolder', function () {

	var config = {
		"tmpDir": path.join( __dirname, '.tmp'),
		"wbfolder": {
			"enabled": true,
			"cwd": path.join( __dirname, './fixtures/wbfolder' ),
			"src": "./**/*.*",
			"dest": path.join( path.join(__dirname, '.tmp'), './wbfolder.wbl')
		}
	};

	afterEach( function ( done ) {
		testUtils.delDir( config.tmpDir, done);
		//done();
	} );

	it( 'should create a wbfolder.wbl using the `wbl` task', function ( done ) {
		senseGo.init( gulp, config, function ( err ) {
			expect( err ).to.be.undefined;

			gulp.series( 'wbfolder' )( function () {
				expect( path.join( __dirname, './.tmp/wbfolder.wbl' ) ).to.be.a.file();
				expect( path.join( __dirname, './.tmp/wbfolder.wbl' ) ).to.have.content( 'script1.js;\r\nscript1.qext' );
				done();
			} );
		} )
	} );

	// Does not really work, mocha-fs is crap, find better solutions.
	xit('should not create a wbfolder.wbl using the `wbl` task not enabled', function( done ) {

		config.wbfolder.enabled = false;
		senseGo.init( gulp, config, function ( err ) {
			expect( err ).to.be.undefined;

			gulp.series( 'wbfolder' )( function () {
				expect( path.join( __dirname, './.tmp/wbfolder.wbl' ) ).to.be.a.file();
				done();
			} );
		} )
	})

} );
