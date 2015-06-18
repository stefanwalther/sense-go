'use strict';

module.exports = function ( gulp, cfg, plugins ) {

	return function (  ) {
		gulp.task( 'less', function () {
			return gulp.src( cfg.less.src, {cwd: cfg.less.cwd} )
				.pipe( plugins.debug( {title: 'less:', minimal: true} ) )
				.pipe( plugins.less() )
				.pipe( gulp.dest( cfg.less.dest, {cwd: cfg.less.cwd} ) );
		} );
	};
};