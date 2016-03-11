'use strict';

var gulp = require( 'gulp' );
var senseGo = require( './../lib/' );
var path = require( 'path' );
var chai = require( 'chai' );
var expect = chai.expect;

describe.only('wbfolder task', function (  ) {

	var outputDir = path.join(__dirname, '.tmp');
		var config = {
			"wbfolder": {
				"enabled": true,
				"cwd": path.join(__dirname, './fixtures/wbfolder'),
				"src": "./**/*.*",
				"dest": path.join(outputDir, './wbfolder.wbl')
			}
		};

		afterEach( function ( done ) {
			//rimraf( './tmp', function () {
			//	done();
			//} );
			done();
		});

		it('creates wbfolder', function ( done ) {
			console.log(config);
			senseGo.init( gulp, config, function ( err ) {
				expect( err ).to.be.undefined;

				gulp.series('wbfolder')();
				done();
			} )
		});

});
