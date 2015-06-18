'use strict';

var gulp = require( 'gulp' );
var debug = require( 'gulp-debug' );
var less = require( 'gulp-less' );

var cfg = {
	less: {
		cwd: __dirname,
		src: './less/**/*.less',
		dest: './output/'
	}
};

gulp.task( 'less', function () {
	return gulp.src( cfg.less.src, {cwd: cfg.less.cwd} )
		.pipe( debug( {title: 'less:', minimal: true} ) )
		.pipe( less() )
		.pipe( gulp.dest( cfg.less.dest, {cwd: cfg.less.cwd} ) );
} );

gulp.task( 'default', ['less'] );