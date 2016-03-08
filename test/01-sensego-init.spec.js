'use strict';

var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var expect = chai.expect;

describe( 'sense-go', function () {

	it('should require the packageName', function ( done ) {
		senseGo.init( gulp, {}, function ( err ) {
			expect( err ).not.to.be.empty;
			done();
		})
	});

	it( 'should have some default options', function ( done ) {
		senseGo.init( gulp, { packageName: 'whatever'}, function ( err ) {
			expect( err ).to.be.empty;
			expect( gulp._registry._tasks ).not.to.be.null;
			expect( gulp._registry._tasks ).to.have.deep.property( 'all' );
			expect( gulp._registry._tasks ).to.have.deep.property( 'init' );
			done();
		} );
	} );

	it('should contain default configuration', function ( done ) {
		senseGo.init( gulp, {packageName: 'whatever'}, function ( err ) {
			expect( err ).to.be.undefined;
			var cfg = senseGo.getConfig();
			expect( cfg ).not.to.be.undefined;
			expect( cfg ).to.have.property('debugOutput');
			expect( cfg ).to.have.property('packageName', 'whatever');
			done();
		})
	});

} );
