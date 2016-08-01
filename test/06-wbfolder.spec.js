'use strict';

var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var chaiFiles = require( 'chai-files' );
chai.use( chaiFiles );
var file = chaiFiles.file;
var expect = chai.expect;
var testUtils = require( './lib/test-utils' );

describe( 'wbfolder', function () {

	var tmpDir = path.join( __dirname, './.tmp' );

	beforeEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );

	it( 'should create a wbfolder.wbl using the `wbl` task', function ( done ) {

		var config = {
			"tmpDir": tmpDir,
			"wbfolder": {
				"enabled": true,
				"cwd": path.join( __dirname, './fixtures/wbfolder' ),
				"src": "./**/*.*",
				"dest": path.join( tmpDir, './wbfolder.wbl' )
			}
		};
		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( senseGo.gulp._registry._tasks ).not.to.be.null;
			expect( senseGo.gulp._registry._tasks ).to.have.property( 'wbfolder:tmp' );

			senseGo.gulp.series( ['copy:toTmp', 'wbfolder:tmp'] )( function () {
				expect( file( path.join( tmpDir, './wbfolder.wbl' ) ) ).to.exist;
				done();
			} );
		} )
	} );

	it( 'should not create a wbfolder.wbl using the `wbl` task not enabled', function ( done ) {

		var config = {
			"wbfolder": {
				"enabled": true,
				"cwd": path.join( __dirname, './fixtures/wbfolder' ),
				"src": "./**/*.*",
				"dest": path.join( tmpDir, './wbfolder.wbl' )
			}
		};
		config.wbfolder.enabled = false;
		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( senseGo.tasks ).not.to.be.null;
			expect( senseGo.tasks ).to.have.property( 'wbfolder:tmp' );

			senseGo.gulp.series( ['copy:toTmp', 'wbfolder:tmp'] )( function () {
				expect( file( path.join( tmpDir, './wbfolder.wbl' ) ) ).to.not.exist;
				done();
			} );
		} )
	} )

} );
