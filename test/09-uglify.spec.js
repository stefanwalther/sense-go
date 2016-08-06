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
var _ = require( 'lodash' );

describe( 'Uglify tasks', function () {

	it( 'uglify:tmp should NOT be included in the pre-built <build> task', function () {
		var defaultConfig = senseGo.loadYml( path.join( __dirname, './../lib/default-config.yml' ) );
		expect( defaultConfig.taskChains.build ).to.not.contain( 'uglify:tmp' );
	} );

	it( 'uglify:tmp should be <include></include>d in the pre-build <release> task', function () {
		var defaultConfig = senseGo.loadYml( path.join( __dirname, './../lib/default-config.yml' ) );
		expect( defaultConfig.taskChains.release ).to.contain( 'uglify:tmp' );
	} );

} );
