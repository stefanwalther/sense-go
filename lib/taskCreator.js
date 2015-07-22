'use strict';
// Node.js dependencies
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
 * @param {object} $$ - Loaded gulp plugins.
 * @param {object} config - User configuration.
 * @constructor
 */
var TaskCreator = function ( gulp, $$, config ) {

	var init = function () {

		_gulpConfig();
		_bumpTasks();
		_copyTasks();
		_cleanTasks();
		_replaceTasks();

		// Finally create the final task chains
		_gulpTasks();

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
			copy( {taskName: 'copy:toTmp', src: path.resolve(config.srcDir + '/**/*.*'), dest: config.tmpDir}, done )
		} );
		gulp.task( 'copy:tmpToDev', function ( done ) {
			copy( {taskName: 'copy:tmpToDev', src: path.resolve(config.tmpDir + '/**/*.*'), dest: config.buildDevDir}, done )
		} );
		gulp.task( 'copy:tmpToLocal', function ( done ) {
			copy( {taskName: 'copy:tmpToLocal', src: path.resolve(config.tmpDir + '/**/*.*'), dest: config.localExtensionPath}, done )
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
				.pipe( $$.debug( {title: 'replace:', minimal: true} ) )
				.pipe( $$.replaceTask( {
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

	var _bumpTasks = function (  ) {

		function increment ( importance ) {

			var defaultArgs = {
				bool: ['tag', 'push'],
				string: 'commit',
				default: {
					tag: false,
					push: false,
					commit: false
				}
			};


			var cliArgs = parseArgs( process.argv.slice( 2 ), defaultArgs );
			var isCommit = false;
			if (typeof cliArgs.commit === 'string' && cliArgs.commit.length === 0) {
				cliArgs.commit = '.';
				isCommit = true;
			}

			return gulp.src( [path.join(process.cwd(), 'package.json')] )
				.pipe( $$.bump( {type: importance} ) )
				.pipe( gulp.dest( './' ) )
				.pipe( $$.filter( 'package.json' ) )
				//.pipe( $$.if( isCommit , $$.git.commit( cliArgs.commit ) ))
				.pipe( $$.if( cliArgs.tag === true, $$.tagVersion() ));
		}

		gulp.task( 'bump', function (  ) { return increment('patch');});
		gulp.task( 'bump:patch', function () { return increment( 'patch' ); } );
		gulp.task( 'bump:minor', function () { return increment( 'minor' ); } );
		gulp.task( 'bump:major', function () { return increment( 'major' ); } );
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
