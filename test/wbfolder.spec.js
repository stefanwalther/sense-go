'use strict';

var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var rimraf = require( 'rimraf' );
chai.use( require( 'chai-fs' ) );
var expect = chai.expect;

describe.only( 'wbfolder task', function () {

	var outputDir = path.join( __dirname, '.tmp' );
	var config = {
		"wbfolder": {
			"enabled": true,
			"cwd": path.join( __dirname, './fixtures/wbfolder' ),
			"src": "./**/*.*",
			"dest": path.join(__dirname, './.tmp/wbfolder.wbl')
		}
	};

	afterEach( function ( done ) {
		rimraf( outputDir, function () {
			done();
		} );
		//done();
	} );

	it( 'creates wbfolder', function ( done ) {
		senseGo.init( gulp, config, function ( err ) {
			expect( err ).to.be.undefined;

			gulp.series( 'wbfolder' )( function () {
				expect( path.join( __dirname, './.tmp/wbfolder.wbl' ) ).to.be.a.file();
				expect( path.join( __dirname, './.tmp/wbfolder.wbl' ) ).to.have.content( 'script1.js;\r\nscript1.qext' );
				done();
			} );
		} )
	} );

} );
