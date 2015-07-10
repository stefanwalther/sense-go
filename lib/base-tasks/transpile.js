'use strict';
var gUtil = require( 'gulp-util' );

module.exports = function ( gulp , cfg, plugins ) {

	return function () {
		return gulp.src( cfg.transpile.src )
			.pipe(plugins.babel())
			.pipe(gulp.dest( cfg.transpile.dest ));
	};
};