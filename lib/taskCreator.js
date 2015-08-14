'use strict';
// Node.js dependencies
var fs = require( 'fs' );
var path = require( 'path' );

// Local dependencies
var senseLoc = require( 'sense-loc' );
var sanitize = require( 'sanitize-filename' );
var chalk = require('chalk');

/**
 * Create tasks based on the existing plugins & configuration
 * @param {object} gulp - Gulp reference.
 * @param {object} plugins - Loaded gulp plugins.
 * @param {object} config - User configuration.
 * @constructor
 */
var TaskCreator = function ( gulp, plugins, config ) {

	var taskUtils = require('./taskUtils')( plugins, config );

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
	 * Gulp task for some internal asynchroneous configuration.
	 *
	 * - localExtensionDir (if null)
	 * - localExtensionPath (based on localExtensionDir + packageName)
	 *
	 * @todo Check how we can enforce this
	 *
	 * @private
	 */
	var _gulpConfig = function () {

		gulp.task( 'init', function ( done ) {
			return senseLoc.getLocalExtensionPath( function ( err, data ) {
				config.localExtensionDir = path.resolve( data );
				config.localExtensionPath = path.join( config.localExtensionDir, sanitize( config.packageName ) );
				taskUtils.log( 'Result', chalk.cyan( '\'init\'' ), 'localExtensionDir: ', chalk.blue( config.localExtensionDir ) );
				taskUtils.log( 'Result', chalk.cyan( '\'init\'' ), 'localExtensionPath: ', chalk.blue( config.localExtensionPath ) );
				done( err );
			} );
		} );
	};

	var _gulpTasks = function () {
		gulp.task( 'default', function () {
			return taskUtils.log( chalk.red( 'sense-go does not provide any default task out of the box.' ) );
		} );
		gulp.task( 'build', gulp.series(
			'init',
			'clean:tmp',
			'copy:toTmp',
			'less:reduce',
			'replace:tmp',
			'wbfolder',
			'clean:tmpIllegal', // clean illegal files
			'jsonlint:tmp',
			'htmlmin:tmp',
			'clean:buildDev',
			'copy:tmpToDev',
			'zip:dev',
			'clean:localExtensionDir',
			'copy:tmpToLocal',
			'clean:tmp'
		) );

		gulp.task( 'release', gulp.series(
			'init',
			'clean:tmp',
			'copy:toTmp',
			'less:reduce',
			'replace:tmp',
			//'wbfolder', ==> doesn't make sense since the uglified files cannot really be edited in Dev-Hub
			'uglify:tmp',
			//'copy:tmpMeta', ==> upload to QRS does not work
			'clean:tmpIllegal', // clean illegal files
			'jsonlint:tmp',
			'clean:buildRelease',
			'copy:tmpToRelease',
			'zip:release',
			'zip:latest',
			'clean:localExtensionDir',
			'copy:tmpToLocal',
			'clean:tmp'
		) );

		gulp.task('publish', gulp.series(
			'git:add',
			'git:commit',
			'git:push'
		));

		gulp.task('all', gulp.series(
			'bump:patch',
			'build',
			'release',
			'git:add',
			'git:commit',
			'git:push',
			'npm:publish'
		));
	};

	init();

};

module.exports = TaskCreator;
