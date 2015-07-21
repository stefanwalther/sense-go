'use strict';
var path = require('path');
var gulp = require('gulp');
var pluginLoader = require('gulp-load-plugins');

var tasksCfg = {
	less: {
		cwd: __dirname,
		src: './less/**/*.less',
		dest: './output/'
	},
	msg: 'Test from index.js'
};

var pluginLoaderCfg = {
	pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
	config: path.join(__dirname, "./package.json"), // where to find the plugins, by default searched up from process.cwd()
	scope: ['dependencies'], // which keys in the config to look within
	replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
	camelize: true, // if true, transforms hyphenated plugins names to camel case
	lazy: true, // whether the plugins should be lazy loaded on demand
	rename: {} // a mapping of plugins to rename
};

var $$ = pluginLoader( pluginLoaderCfg);





//gulp.task('default', ['less']);
//
//gulp.on('task_start', function ( e ) {
//	console.log('task_start');
//});
//gulp.on('task_stop', function ( e ) {
//	console.log('task_stop', e);
//});
//
//gulp.start.apply( gulp, ['default']);

module.exports = gulp;
