'use strict';
// Node.js dependencies
var path = require( 'path' );

// Local dependencies
var del = require( 'del' );
var gUtil = require( 'gulp-util' ); //Todo: deprecated in Gulp4
var senseLoc = require( 'sense-loc' );
var sanitize = require( 'sanitize-filename' );
var _ = require( 'lodash' );
/**
 * Create tasks based on the existing plugins & configuration
 * @param gulp
 * @param config
 * @constructor
 */
var TaskCreator = function ( gulp, plugins, config ) {

	var init = function () {

		_gulpConfig();
		_copyTasks();
		_cleanTasks();
		_gulpTasks();
		_replaceTasks();

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

	var _copyTasks = function () {

		/**
		 * Generic copy task
		 * @param taskConfig { src, dest }
		 * @param done
		 */
		function copy ( taskConfig, done ) {
			gulp.src( taskConfig.src )
				.pipe( _debug( taskConfig ) )
				.pipe( gulp.dest( taskConfig.dest ) )
				.on( 'end', function () {
					done();
				} );
		}

		gulp.task( 'copy:toTmp', function ( done ) {
			copy( {taskName: 'copy:toTmp', src: config.srcDir + '/**/*.*', dest: config.tmpDir}, done )
		} );
		gulp.task( 'copy:tmpToDev', function ( done ) {
			copy( {taskName: 'copy:tmpToDev', src: config.tmpDir + '/**/*.*', dest: config.buildDevDir}, done )
		} );
		gulp.task( 'copy:tmpToLocal', function ( done ) {
			copy( {taskName: 'copy:tmpToLocal', src: config.tmpDir + '/**/*.*', dest: config.localExtensionPath}, done )
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
				done();
				//return clean( {src: _getLocalExtensionPath()}, {force: true}, done );
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

		gulp.task('replace', function ( done ) {
			replace({
					src: [path.resolve(config.tmpDir, '**/*.{qext,json,js,html,xml}')],
					dest: path.resolve(config.tmpDir)
				}, done );
		});

	};

	var _gulpTasks = function () {
		gulp.task( 'default', function () {
			return gUtil.log( gUtil.colors.red( 'sense-go does not provide any default task out of the box.' ) );
		} );
		gulp.task( 'build', gulp.series( 'init', 'clean:tmp', 'copy:toTmp', 'clean:buildDev', 'copy:tmpToDev', 'clean:localExtensionDir', 'copy:tmpToLocal' ) );
	};

	var _log = function () {
		if ( config.debugOutput ) {
			gUtil.log.apply( console, arguments );
		}
	};

	var _debug = function ( taskConfig ) {
		if ( config.debugOutput ) {
			return plugins.debug( {title: taskConfig.taskName} )
		}
	};

	init();

};

module.exports = TaskCreator;
