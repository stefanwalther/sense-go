'use strict';
// Node.js dependencies
var fs = require('fs');
var path = require( 'path' );

// Local dependencies
var del = require( 'del' );
var gUtil = require( 'gulp-util' ); //Todo: deprecated in Gulp4
var senseLoc = require( 'sense-loc' );
var sanitize = require( 'sanitize-filename' );
var _ = require( 'lodash' );
var parseArgs = require( 'minimist' );

/**
 * Create tasks based on the existing plugins & configuration
 * @param {object} gulp - Gulp reference.
 * @param {object} plugins - Loaded gulp plugins.
 * @param {object} config - User configuration.
 * @constructor
 */
var TaskCreator = function ( gulp, plugins, config ) {

	var init = function () {

		_gulpConfig();
		_cleanTasks();
		loadTasks();
		_replaceTasks();

		// Finally create the final task chains
		_gulpTasks();

	};

	var loadTasks = function (  ) {
		var normalizedPath = path.join(__dirname, "tasks");
		console.log('loadTasks', normalizedPath);

		fs.readdirSync(normalizedPath).forEach(function(file) {
			require("./tasks/" + file)( gulp, plugins, config );
		});
	};

	// ****************************************************************************************
	// Tasks
	// ****************************************************************************************

	/**
	 * Adds some internal configuration:
	 *
	 * - localExtensionDir (if null)
	 * - localExtensionPath (based on localExtensionDir + packageName)
	 *
	 * @private
	 */
	var _gulpConfig = function () {

		gulp.task( 'init', function ( done ) {
			return senseLoc.getLocalExtensionPath( function ( err, data ) {
				config.localExtensionDir = path.resolve( data );
				config.localExtensionPath = path.join( config.localExtensionDir, sanitize( config.packageName ) );
				_log( 'Result', gUtil.colors.cyan( '\'init\'' ), 'localExtensionDir: ', gUtil.colors.blue( config.localExtensionDir ) );
				_log( 'Result', gUtil.colors.cyan( '\'init\'' ), 'localExtensionPath: ', gUtil.colors.blue( config.localExtensionPath ) );
				done( err );
			} );
		} );
	};

	var _cleanTasks = function () {

		/**
		 * Generic delete/clean task
		 * @param taskConfig { src }
		 * @param done
		 * @returns {*}
		 */
		function clean ( taskConfig, delOptions, done ) {
			del( taskConfig.src, delOptions, function ( err, paths ) {
				_log( 'del paths', paths );
				done( err );
			} );
		}

		gulp.task( 'clean:tmp', function ( done ) {
			clean( {src: path.resolve( config.tmpDir )}, {}, done );
		} );

		gulp.task( 'clean:buildDev', function ( done ) {
			clean( {src: path.resolve( config.buildDevDir )}, {}, done );
		} );

		gulp.task( 'clean:localExtensionDir', function ( done ) {
			if ( !_.isEmpty( config.packageName ) ) {
				clean( { src: config.localExtensionPath }, {force: true}, done );
			}
		} );
	};

	var _replaceTasks = function () {



		function replace ( taskConfig, done ) {

			var replacements = {};
			replacements.pkg = config.pkg;

			gulp.src( taskConfig.src )
				.pipe( plugins.debug( {title: 'replace:', minimal: true} ) )
				.pipe( plugins.replaceTask( {
					patterns: [
						{
							json: replacements
						},
						{
							match: 'timestamp',
							replacement: new Date().getTime()
						}
					]
				} ) )
				.pipe( gulp.dest( taskConfig.dest ) )
				.on( 'end', function () {
					done();
				} );
		}

		gulp.task('replace:tmp', function ( done ) {
			replace({
					src: [path.resolve(config.tmpDir, '**/*.{qext,json,js,html,xml,yml,txt}')],
					dest: path.resolve(config.tmpDir)
				}, done );
		});

	};

	var _gulpTasks = function () {
		gulp.task( 'default', function () {
			return gUtil.log( gUtil.colors.red( 'sense-go does not provide any default task out of the box.' ) );
		} );
		gulp.task( 'build', gulp.series( 'init', 'clean:tmp', 'copy:toTmp', 'replace:tmp', 'clean:buildDev', 'copy:tmpToDev', 'clean:localExtensionDir', 'copy:tmpToLocal' ) );
	};

	var _log = function () {
		if ( config.debugOutput ) {
			gUtil.log.apply( console, arguments );
		}
	};

	var _debug = function ( taskConfig ) {
		if ( config.debugOutput ) {
			return $$.debug( {title: taskConfig.taskName} )
		}
	};

	init();

};

module.exports = TaskCreator;
