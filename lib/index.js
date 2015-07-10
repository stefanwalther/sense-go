'use strict';
// core deps
var path = require( 'path' );
var fs = require( 'fs' );
var parseArgs = require( 'minimist' );

// packages
var gUtil = require( 'gulp-util' );
var yaml = require( 'js-yaml' );
var extend = require( 'extend-shallow' );
var pluginLoader = require( 'gulp-load-plugins' );
var taskLoader = require( 'gulp-simple-task-loader' );
var parseArgs = require( 'minimist' );
var Promise = require( 'bluebird' );

var senseGo = function () {

	var defaultConfig = yaml.safeLoad( fs.readFileSync( path.join( __dirname, 'default-config.yml' ), 'utf8' ) );
	var plugins;
	var cliArgs;

	/**
	 * Initialize sense go
	 * @param gulp - Your gulp instance
	 * @param userConfig - Your configuration file
	 */
	function init ( gulp, userConfig ) {

		this.config = extend( defaultConfig, userConfig || {} );
		_loadPlugins();
		_loadTasks( gulp, this.config );
		//require('./taskCreator')( gulp, config);

		gulp.task( 'default', function () {
			return gUtil.log( gUtil.colors.red( 'senseGo does not provide any default task out of the box.' ) );
		} );
	}

	function getConfig () {
		return this.config;
	}

	// ****************************************************************************************
	// Internal helpers
	// ****************************************************************************************

	/**
	 * Load the plugins
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
	 * Load all the tasks
	 * @param gulp
	 * @private
	 */
	function _loadTasks ( gulp, config ) {

		var taskLoaderCfg = {
			taskDirectory: path.join( __dirname, './base-tasks' ), 	// the directory your tasks are stored in
			plugins: plugins,                 						// the plugins to expose to your tasks
			filenameDelimiter: '-',       							// a character or string of characters to replace in task filenames
			tasknameDelimiter: ':',           						// a character or string of characters to insert in place of removed filenameDelimiter
			config: config                   						// an object to store configuration for use in tasks
		};
		taskLoader( taskLoaderCfg, gulp );
	}

	function _validateConfig () {

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

	// ****************************************************************************************
	// Api definition
	// ****************************************************************************************
	return {
		init: init,
		getConfig: getConfig
	}
};

module.exports = new senseGo();