'use strict';

var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var rimraf = require( 'rimraf' );
var chaiFiles = require('chai-files');
chai.use( chaiFiles );
var file = chaiFiles.file;
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
	} );

	it( 'should create a wbfolder.wbl using the `wbl` task', function ( done ) {
		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;

			gulp.series( 'wbfolder:tmp' )( function () {
				expect( file(path.join( __dirname, './.tmp/wbfolder.wbl' )) ).to.exist;
				done();
			} );
		} )
	} );

	it('should not create a wbfolder.wbl using the `wbl` task not enabled', function( done ) {

		config.wbfolder.enabled = false;
		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;

			gulp.series( 'wbfolder:tmp' )( function () {
				expect( file(path.join( __dirname, './.tmp/wbfolder.wbl' )) ).to.not.exist;
				done();
			} );
		} )
	})

} );
