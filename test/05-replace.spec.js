/**
 * @todo
 * - Some negative tests
 */
'use strict';
var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var chaiFiles = require( 'chai-files' );
chai.use( chaiFiles );
var file = chaiFiles.file;
var expect = chai.expect;
var testUtils = require( './lib/test-utils' );

describe( 'replace tasks', function () {

	var tmpDir = path.join( __dirname, './.tmp' );

	beforeEach( function( done ) {
		return testUtils.delDir(tmpDir, done);
	});

	afterEach( function( done ) {
		return testUtils.delDir(tmpDir, done);
	});

	it( 'replaces content from package.json', function ( done ) {

		var config = {
			replaceTmp: {
				src: path.join( __dirname, './fixtures/replace-pkg/**/*.js' ),
				dest: tmpDir
			}
		};

		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( senseGo.tasks ).not.to.be.null;
			expect( senseGo.tasks ).to.have.property( 'replace:tmp' );

			senseGo.gulp.series( ['copy:toTmp', 'replace:tmp'] )( function () {
				expect( file( path.join( tmpDir, 'bar.js' ) ) ).to.exist;
				expect( file( path.join( tmpDir, 'foo.js' ) ) ).to.exist;
				expect( file( path.join( tmpDir, 'bar.js' ) ) ).to.contain( "var lic = 'MIT';" );
				expect( file( path.join( tmpDir, 'foo.js' ) ) ).to.contain( "var name = 'sense-go';" );
				done();
			} );

		} );

	} );

	it( 'replaces custom replacements items', function ( done ) {

		var config = {
			replaceTmp: {
				src: path.join( __dirname, './fixtures/replace-custom/**/*.js' ),
				dest: tmpDir
			},
			replacements: {
				foo: {
					v: "foo"
				},
				bar: {
					v: "bar"
				},
				baz: {
					v: "baz"
				}
			}
		};

		senseGo.init( config, function ( err ) {
			expect( err ).to.be.undefined;
			expect( senseGo.tasks ).not.to.be.null;
			expect( senseGo.tasks ).to.have.property( 'copy:toTmp' );
			expect( senseGo.tasks ).to.have.property( 'replace:tmp' );

			senseGo.gulp.series( ['copy:toTmp', 'replace:tmp'] )( function () {
				expect( file( path.join( tmpDir, 'foo.js' ) ) ).to.exist;
				expect( file( path.join( tmpDir, 'bar.js' ) ) ).to.exist;
				expect( file( path.join( tmpDir, 'baz.js' ) ) ).to.exist;
				expect( file( path.join( tmpDir, 'foo.js' ) ) ).to.contain( "var foo = 'foo';" );
				expect( file( path.join( tmpDir, 'bar.js' ) ) ).to.contain( "var bar = 'bar';"  );
				expect( file( path.join( tmpDir, 'baz.js' ) ) ).to.contain( "var baz = 'baz';"  );
				done();
			} );

		} );

	} );

} );
