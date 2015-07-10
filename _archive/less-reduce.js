'use strict';

module.exports = function ( gulp, cfg, plugins ) {

	return function (  ) {
		gulp.task( 'lessReduce', function () {
			return gulp.src( cfg.lessReduce.src, cfg.lessReduce.options )
				.pipe( plugins.debug( {title: 'lessReduce:', minimal: cfg.debug.minimal} ) )
				.pipe( plugins.less() )
				.pipe( gulp.dest( cfg.lessReduce.dest, {cwd: cfg.lessReduce.options.cwd} ) );
		} );
	};
};