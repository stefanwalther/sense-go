'use strict';

// core dependencies
var fs = require('fs');
var path = require( 'path' );

// local dependencies
var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var chai = require( 'chai' );
var rimraf = require( 'rimraf' );
chai.use( require( 'chai-files' ) );
var expect = chai.expect;
var testUtils = require('./lib/test-utils');

describe( 'less tasks', function () {

	it( 'should run lessEach', function ( done ) {

		var config = {
			srcDir: path.join(__dirname, './fixtures/lessEach'),
			tmpDir: path.join(__dirname, './.tmp')
		};

		beforeEach( function ( done ) {
			testUtils.delDir( config.tmpDir, done);
		});
		afterEach( function ( done ) {
			testUtils.delDir( config.tmpDir, done);
		});

		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( gulp._registry._tasks ).not.to.be.null;
			expect( gulp._registry._tasks ).to.have.property( 'less:each' );

			gulp.series( 'less:each' )( function () {
				expect( path.join( __dirname, './.tmp/root.css' ) ).to.exist;
				expect( path.join( __dirname, './.tmp/variables.css' ) ).to.exist;
				expect( path.join( __dirname, './.tmp/whatever.css' ) ).to.exist;
				done();
			} );
		} );
	} );

} );
