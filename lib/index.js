'use strict';
// core dependencies
var path = require( 'path' );
var fs = require( 'fs' );

// packages
var parseArgs = require( 'minimist' );
var yaml = require( 'js-yaml' );
var extend = require( 'extend-shallow' );
var pluginLoader = require( 'gulp-load-plugins' );
var _ = require( 'lodash' );
var gUtil = require( 'gulp-util' ); //Todo: deprecated in Gulp4

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
		}

		_loadPlugins();
		_validateConfig( function ( err ) {
			if ( err && err.length > 0 ) {

				err.forEach( function ( errItem ) {
					gUtil.log( gUtil.colors.red( 'One or more errors occurred: ', errItem ) );
				});
				return callback( err.concat('\n') );
			}
			_createTasks();
			callback();
		} );

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

		var pluginLoaderCfg = {
			pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
			config: path.join( __dirname, "./../package.json" ), // where to find the plugins, by default searched up from process.cwd()
			scope: ['dependencies'], // which keys in the config to look within
			replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
			camelize: true, // if true, transforms hyphenated plugins names to camel case
			lazy: true, // whether the plugins should be lazy loaded on demand
			rename: {} // a mapping of plugins to rename
		};

		plugins = pluginLoader( pluginLoaderCfg );
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
