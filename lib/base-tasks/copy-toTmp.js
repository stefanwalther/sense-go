'use strict';
var gUtil = require( 'gulp-util' );
var qlikloc = require( 'qlikloc' );
var path = require( 'path' );

module.exports = function ( gulp, cfg, plugins ) {

	return function () {
		gulp.src( ['src/**/*'] )
			.pipe( plugins.debug())
			.pipe( gulp.dest( cfg.tmpDir ) );
	};
};