/*global module, require*/
'use strict';
// core dependencies
var path = require( 'path' );
var fs = require( 'fs' );
var expandTilde = require('expand-tilde');

// packages
var parseArgs = require( 'minimist' );
var yaml = require( 'js-yaml' );
var extend = require( 'extend-shallow' );
var pluginLoader = require( 'gulp-load-plugins' );
var _ = require( 'lodash' );
var gUtil = require( 'gulp-util' ); //Todo: deprecated in Gulp4
var senseLoc = require( 'sense-loc' );

var senseGo = function () {

	var defaultConfig = yaml.safeLoad( fs.readFileSync( path.join( __dirname, 'default-config.yml' ), 'utf8' ) );

	var plugins = null;
	var cliArgs;
	var config;
	var gulp;

	/**
	 * Initialize sense-go
	 *
	 * @description:
	 * - Loads all required plugins
	 *
	 * @param userConfig - Your configuration file
	 * @param gulpObj {object} Gulp object
	 * @param callback {function} Callback
	 */
	function init ( gulpObj, userConfig, callback ) {

		gulp = gulpObj || require( 'gulp' );

		config = extend( defaultConfig, userConfig || {} );

		var packagePath = path.join( process.cwd(), 'package.json' );

		if ( fs.existsSync( packagePath ) ) {
			config.pkg = require( packagePath );

			// Default package name
			if ( _.isEmpty( config.packageName ) ) {
				config.packageName = config.pkg.name;
			}
		}

		_initConfig( config, function ( err ) {
			if ( err ) {
				return callback( err );
			}
			_loadPlugins();
			_validateConfig( function ( err ) {
				if ( err && err.length > 0 ) {

					err.forEach( function ( errItem ) {
						gUtil.log( gUtil.colors.red( 'One or more errors occurred: ', errItem ) );
					} );
					return callback( err.concat( '\n' ) );
				}
				_createTasks();
				callback();
			} );
		} );
	}

	function _initConfig ( config, cb ) {

		// Config (typical Windows configuration)
		// 	toLocal: true
		//	pathFetching: true
		if ( config.deployment.toLocal.enabled === true && config.deployment.toLocal.pathFetching === true ) {
			senseLoc.getLocalExtensionPath( function ( err, data ) {
				if ( err ) {
					return done( err );
				}
				if ( !_.isEmpty( data ) ) {
					config.deployment.toLocal.extensionBaseDir = path.resolve( data );
					config.deployment.toLocal.extensionPath = path.join( config.deployment.toLocal.extensionBaseDir, sanitize( config.packageName ) );
				}
				cb( err );
			} );

			//Todo: There is a bug in here ...
			// Config (typical non-Windows configuration) ==> needs extensionBaseDir
			// 	toLocal: false
			// 	pathFetching: false
		} else if ( config.deployment.toLocal.enabled === true && config.deployment.toLocal.pathFetching === false ) {
			if ( _.isEmpty( config.deployment.toLocal.extensionBaseDir ) ) {
				cb( 'config.deployment.toLocal.extensionBaseDir needs to be defined.' );
			} else {
				config.deployment.toLocal.extensionPath = expandTilde( path.join(config.deployment.toLocal.extensionBaseDir), config.packageName);
				cb();
			}
		} else {
			cb();
		}
	}

	/**
	 * Return the current configuration which is the result of the merged default-config + the passed-in user-config.
	 * @returns {*}
	 */
	function getConfig () {
		return config;
	}

	// ****************************************************************************************
	// Internal helpers
	// ****************************************************************************************

	/**
	 * Create default tasks.
	 * @private
	 */
	function _createTasks () {

		var TaskCreator = require( './taskCreator' );
		var taskCreator = new TaskCreator( gulp, plugins, config );
	}

	/**
	 * Load the plugins and bind them to this.plugins.
	 * @private
	 */
	function _loadPlugins () {

		plugins = pluginLoader( require( './pluginLoaderConfig' ) );
	}

	/**
	 * Returns an array of errors.
	 * @param callback
	 * @returns {*}
	 * @private
	 */
	function _validateConfig ( callback ) {

		var err = [];
		if ( _.isEmpty( config.packageName ) ) {
			err.push( 'packageName cannot be null or empty.' );
		}

		if ( err.length > 0 ) {
			return callback( err );
		} else {
			return callback( null );
		}
	}

	function _parseArgs () {

		/**
		 * Supported arguments with default values:
		 * msg
		 * @type {{string: string, default: {msg: string}}}
		 */
		var defaultArgs = {
			string: 'msg',
			default: {
				msg: '--no message--'
			}
		};
		cliArgs = parseArgs( process.argv.slice( 2 ), defaultArgs );
	}

	function loadYml ( filePath ) {
		return yaml.safeLoad( fs.readFileSync( filePath, 'utf8' ) );
	}

	// ****************************************************************************************
	// Api definition
	// ****************************************************************************************
	return {
		init: init,
		getConfig: getConfig,
		loadYml: loadYml,
		plugins: plugins
	}
};

module.exports = new senseGo();
