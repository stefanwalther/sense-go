var gulp = require('gulp');

var cfg = {
	less: {
		cwd: __dirname,
		src: './less/**/*.less',
		dest: './output/'
	},
	msg: 'Test from gulpfile2.js'
};

var plugins = {};
plugins.less = require('gulp-less');
plugins.debug = require('gulp-debug');

require('./tasks/less')(gulp, cfg, plugins);

gulp.task('default', ['less']);