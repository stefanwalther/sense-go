'use strict';

// core dependencies
var path = require( 'path' );
var fs = require( 'fs-extra' );

// local dependencies
var chai = require( 'chai' );
var chaiFiles = require( 'chai-files' );
chai.use( chaiFiles );
var file = chaiFiles.file;
var dir = chaiFiles.dir;
var expect = chai.expect;

describe( 'After all tests', function () {

	it( 'There is no .tmp directory in root', function () {
		expect( dir( path.join( __dirname, './tmp' ) ) ).to.not.exist;
	} );

	it( 'There is no .tmp directory in test', function () {
		expect( dir( path.join( __dirname, './test/.tmp' ) ) ).to.not.exist;
	} );

} );
