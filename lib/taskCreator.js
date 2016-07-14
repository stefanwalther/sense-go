'use strict';
// Node.js dependencies
var fs = require( 'fs' );
var path = require( 'path' );

// Local dependencies
var sanitize = require( 'sanitize-filename' );
var chalk = require( 'chalk' );
var gutil = require( 'gulp-util' );

/**
 * Create tasks based on the existing plugins & configuration
 * @param {object} gulp - Gulp reference.
 * @param {object} plugins - Loaded gulp plugins.
 * @param {object} config - User configuration.
 * @constructor
 */
var TaskCreator = function ( gulp, plugins, config ) {

	var taskUtils = require( './taskUtils' )( plugins, config );

	var init = function () {

		_gulpConfig();
		_loadTasks();

		// Finally create the final task chains
		_gulpTasks();

	};

	// ****************************************************************************************
	// Private methods
	// ****************************************************************************************

	/**
	 * Load all tasks from 'tasks' folder.
	 * Tasks must have the same signature
	 *
	 * TaskName( gulp, plugins, config, taskUtils)
	 *
	 * @private
	 */
	var _loadTasks = function () {
		var normalizedPath = path.join( __dirname, "tasks" );

		fs.readdirSync( normalizedPath ).forEach( function ( file ) {
			require( "./tasks/" + file )( gulp, plugins, config, taskUtils );
		} );
	};

	/**
	 * Gulp task for some internal asynchronous configuration.
	 *
	 * @todo Check how we can enforce this
	 *
	 * @private
	 */
	var _gulpConfig = function () {


	};

	var _gulpTasks = function () {
		gulp.task( 'default', function ( done ) {
			gutil.log( chalk.red( 'sense-go does not provide any default task out of the box.' ) );
			done();
		} );

		// Create task-chains from config
		config.taskChains.forEach( function( task ) {
			gulp.task( Object.keys(task)[0], gulp.series(task[Object.keys(task)[0]]));
		});

	};

	init();

};

module.exports = TaskCreator;
