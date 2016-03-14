'use strict';

// core dependencies
var fs = require('fs');
var path = require( 'path' );

// local dependencies
var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var chai = require( 'chai' );
var rimraf = require( 'rimraf' );
chai.use( require( 'chai-fs' ) );
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

		senseGo.init( gulp, config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( gulp._registry._tasks ).not.to.be.null;
			expect( gulp._registry._tasks ).to.have.property( 'less:each' );

			gulp.series( 'less:each' )( function () {
				expect( path.join( __dirname, './.tmp/root.css' ) ).to.be.a.file();
				expect( path.join( __dirname, './.tmp/variables.css' ) ).to.be.a.file();
				expect( path.join( __dirname, './.tmp/whatever.css' ) ).to.be.a.file();
				expect( path.join( __dirname, './.tmp/root.css' ) ).to.have.content( fs.readFileSync( path.join( __dirname, './expected/lessEach/root.css' ), 'utf8' ).replace('\n','') );
				expect( path.join( __dirname, './.tmp/whatever.css' ) ).to.have.content( fs.readFileSync( path.join( __dirname, './expected/lessEach/whatever.css' ), 'utf8' ).replace('\n', '') );
				done();
			} );
		} );
	} );

} );
