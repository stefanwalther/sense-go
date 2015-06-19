'use strict';

module.exports = function ( gulp, cfg, plugins ) {

	return function (  ) {
		gulp.task( 'replace', function () {
			return gulp.src( cfg.less.src, {cwd: cfg.less.cwd} )
				.pipe( plugins.debug( {title: 'less:', minimal: true} ) )
				.pipe( plugins.replace() )
				.pipe( gulp.dest( cfg.less.dest, {cwd: cfg.less.cwd} ) );
		} );
	};
};