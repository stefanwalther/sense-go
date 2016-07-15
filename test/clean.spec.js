'use strict';
var fs = require('fs-extra');
var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var rimraf = require( 'rimraf' );
var chaiFiles = require('chai-files');
chai.use( chaiFiles );
var file = chaiFiles.file;
var expect = chai.expect;
var testUtils = require('./lib/test-utils');
var cleanTask = require('./../lib/tasks/clean');

describe( 'Clean tasks', function () {

	var tmpDir = path.join(__dirname, './.tmp');

	beforeEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );
	afterEach( function ( done ) {
		testUtils.delDir( tmpDir, done );
	} );


	describe( 'Core method', function () {

		it( 'should clean the entire directory', function ( done ) {
			var gulp = senseGo.gulp;
			fs.copy(path.join(__dirname, './fixtures/clean'), tmpDir, function (err) {
				if (err) return console.error(err);
				var taskConfig = {
					taskName: 'test:',
					src: path.join(tmpDir, './**/*.*')
				};
				var delOptions = {};
				cleanTask( gulp ).clean( taskConfig, delOptions, function() {
					expect( file( path.join(tmpDir, './foo.js'))).to.not.exist;
					expect( file( path.join(tmpDir, './bar.js'))).to.not.exist;
					expect( file( path.join(tmpDir, './baz.js'))).to.not.exist;
					done();
				});
			})
		} );



	} );

} );
