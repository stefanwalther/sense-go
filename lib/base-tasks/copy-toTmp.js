'use strict';
var gUtil = require( 'gulp-util' );

module.exports = function ( gulp, cfg, plugins ) {

	return function ( callback ) {
		gulp.src( ['src/**/*'] )
			.pipe( plugins.debug( {title: 'copy:toTmp', minimal: cfg.debug.minimal} ) )
			.pipe( gulp.dest( cfg.tmpDir ) );
		callback();
	};
};