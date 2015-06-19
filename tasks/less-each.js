'use strict';

module.exports = function ( gulp, cfg, plugins ) {

	return function (  ) {
		gulp.task( 'less-each', function () {
			return gulp.src( cfg.less.src, cfg.less.options )
				.pipe( plugins.debug( {title: 'less:', minimal: true} ) )
				.pipe( plugins.less() )
				.pipe( gulp.dest( cfg.less.dest, {cwd: cfg.less.options.cwd} ) );
		} );
	};
};