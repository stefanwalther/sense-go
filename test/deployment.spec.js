'use strict';

var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var expect = chai.expect;

xdescribe('Deployment tasks', function (  ) {

	it('toLocal should be ignored if disabled', function ( done ) {

		var config = {
			"deployment": {
				"toLocal": {
					"enabled": false
				}
			}
		};

		done();



	});

});
