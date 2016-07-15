'use strict';

// core dependencies
var path = require( 'path' );

// local dependencies
var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var chai = require( 'chai' );
var chaiFiles = require('chai-files');
chai.use( chaiFiles );
var file = chaiFiles.file;
var expect = chai.expect;
var testUtils = require( './lib/test-utils' );

describe( 'less tasks (with custom configuration)', function () {

	it( 'should run lessEach', function ( done ) {

		var config = {
			lessEach: {
				src: path.join( __dirname, './fixtures/lessEach/**/*.less' ),
				dest: path.join( __dirname, './.tmp' )
			},
			tmpDir: path.join( __dirname, './.tmp' )
		};

		before( function ( done ) {
			testUtils.delDir( config.tmpDir, done );
		} );
		after( function ( done ) {
			testUtils.delDir( config.tmpDir, done );
		} );

		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( gulp._registry._tasks ).not.to.be.null;
			expect( gulp._registry._tasks ).to.have.property( 'less:each' );

			gulp.series( 'less:each' )( function () {
				expect( file( path.join( __dirname, './.tmp/root.css' ) ) ).to.exist;
				expect( file( path.join( __dirname, './.tmp/variables.css' ) ) ).to.exist;
				expect( file( path.join( __dirname, './.tmp/whatever.css' ) ) ).to.exist;
				done();
			} );
		} );
	} );

	it( 'should run lessReduce tasks', function ( done ) {
		var config = {
			lessReduce: {
				src: path.join( __dirname, './fixtures/lessReduce/root.less'),
				dest: path.join( __dirname, './.tmp' )
			},
			tmpDir: path.join( __dirname, './.tmp')
		};

		before( function ( done ) {
			testUtils.delDir( config.tmpDir, done );
		} );
		after( function ( done ) {
			testUtils.delDir( config.tmpDir, done );
		} );

		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( gulp._registry._tasks ).not.to.be.null;
			expect( gulp._registry._tasks ).to.have.property( 'less:reduce' );

			gulp.series( 'less:reduce' )( function () {
				expect( file( path.join( __dirname, './.tmp/root.css' ) ) ).to.exist;
				done();
			} );
		} );
	} )

} );
