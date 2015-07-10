'use strict';

module.exports = function ( gulp, cfg, plugins ) {

	return function () {
			return gulp.src(['src/**/*'])
				.pipe(gulp.dest('dist'));
		};

};