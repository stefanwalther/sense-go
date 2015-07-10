'use strict';
var path = require('path');
var gulp = require('gulp');

var cfg = {
	less: {
		cwd: __dirname,
		src: './less/**/*.less',
		dest: './output/'
	},
	msg: 'Test from gulpfile3.js'
};

var plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
	config: path.join(__dirname, "./package.json"), // where to find the plugins, by default searched up from process.cwd()
	scope: ['dependencies'], // which keys in the config to look within
	replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
	camelize: true, // if true, transforms hyphenated plugins names to camel case
	lazy: true, // whether the plugins should be lazy loaded on demand
	rename: {} // a mapping of plugins to rename
});

console.log('plugins', plugins);

require('./tasks/less')(gulp, cfg, plugins);

gulp.task('default', ['less']);