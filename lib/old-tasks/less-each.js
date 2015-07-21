'use strict';

module.exports = function ( gulp, cfg, plugins ) {

	return function (  ) {
		gulp.task( 'lessEach', function () {
			return gulp.src( cfg.lessEach.src )
				.pipe( plugins.debug( {title: 'lessEach:', minimal: cfg.debug.minimal} ) )
				.pipe( plugins.less() )
				.pipe( gulp.dest( cfg.lessEach.dest ) );
		} );
	};
};