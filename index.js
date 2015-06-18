'use strict';
var path = require('path');
var gulp = require('gulp');
var pluginLoader = require('gulp-load-plugins');
var taskLoader = require('gulp-simple-task-loader');

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

var plugins = pluginLoader( pluginLoaderCfg);

var taskLoaderCfg = {
	taskDirectory: './tasks', // the directory your tasks are stored in
	plugins: plugins,                 // the plugins to expose to your tasks
	filenameDelimiter: '',       // a character or string of characters to replace in task filenames
	taskDelimiter: '',           // a character or string of characters to insert in place of removed filenameDelimiter
	config: tasksCfg                   // an object to store configuration for use in tasks
};

//require('./tasks/less')(gulp, plugins, cfg);

taskLoader(taskLoaderCfg );

gulp.task('default', ['less']);

gulp.on('task_start', function ( e ) {
	console.log('task_start');
});
gulp.on('task_stop', function ( e ) {
	console.log('task_stop', e);
});

gulp.start.apply( gulp, ['default']);