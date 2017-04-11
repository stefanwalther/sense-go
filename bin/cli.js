#!/usr/bin/env node

'use strict';

/**
 * Borrowed from gulp
 * The MIT License (MIT)
 * Copyright (c) 2014-2015 Fractal <contact@wearefractal.com>
 */

var fs = require( 'fs' );
var path = require( 'path' );

var gulp = require( 'gulp' );
var argv = require( 'minimist' )( process.argv.slice( 2 ) );
var Liftoff = require( 'liftoff' );
var v8flags = require( 'v8flags' );
var _ = require( 'lodash' );
var chalk = require( 'chalk' );

var log = require( './log' );
var senseGo = require( './../lib/' );
var pkg = require( '../package' );
var taskTree = require( './task-tree' );
var extend = require( 'deep-extend' );

// store a reference to the current CWD
process.env.INIT_CWD = process.cwd();

var cli = new Liftoff( {
	name: 'sense-go',
	v8flags: v8flags
} );

// exit with 0 or 1
var failed = false;
process.once( 'exit', function ( code ) {
	if ( code === 0 && failed ) {
		exit( 1 );
	}
} );

/**
 * flags
 */
var versionFlag = argv.v || argv.version;
var debugFlag = argv.d || argv.debug;
var tasksFlag = argv.T || argv.tasks;
var hasSenseGoYml = fs.existsSync( path.join( process.cwd(), '.sense-go.yml' ) );
var hasSenseGoYmlLocal = fs.existsSync( path.join( process.cwd(), '.sense-go.local.yml' ) );
var hasSenseGoJs = fs.existsSync( path.join( process.cwd(), 'sense-go.js' ) );
var senseGoJsFile = (hasSenseGoJs) ? path.join( process.cwd(), 'sense-go.js' ) : null;
var tasks = argv._;
var toRun = tasks.length ? tasks : ['default'];

var simpleTasksFlag = argv['tasks-simple'];
var shouldLog = !argv.silent && !simpleTasksFlag;

if ( !shouldLog ) {
	log = function () {};
}

cli.on( 'respawn', function ( flags, child ) {
	var nodeFlags = chalk.magenta( flags.join( ', ' ) );
	var pid = chalk.magenta( child.pid );
	log( 'Node flags detected:', nodeFlags );
	log( 'Respawned to PID:', pid );
} );

var cwd = argv.cwd || (hasSenseGoYml ? process.cwd() : null);

cli.launch( {
	cwd: cwd
}, run );

function run ( env ) {

	console.log( '' ); // empty line
	log( chalk.cyan( '.: STARTING SENSE-GO :.' ) );

	process.on( 'senseGo_onInit', function () {
		//
	} );
	process.on( 'senseGo_onEnd', function () {
		log( chalk.cyan( '.: SENSE-GO FINISHED :.' ) );
		console.log( '' );
	} );

	senseGo.gulp.on( 'error', function ( error ) {
		if ( debugFlag ) {
			log( error.name + ' ' + chalk.red( 'An error occurred. Here are the details:') );
			console.log( 'error', error );
		} else {
			log( error.name + ' ' + chalk.red( 'An error occurred. Use -d to show details') );
		}
	} );

	// chdir before requiring `sense-go.js` to allow users to chdir as needed
	if ( process.cwd() !== env.cwd ) {
		process.chdir( env.cwd );
		log( 'Working directory changed to', tildify( env.cwd ) );
	}

	if ( versionFlag ) {
		return log( 'sense-go CLI version: ', pkg.version );

	}

	if ( (hasSenseGoYml || hasSenseGoYmlLocal) && !hasSenseGoJs ) {
		var userConfig = senseGo.loadYml( path.join( process.cwd(), '.sense-go.yml' ) );
		log( 'Using the .sense-go.yml file ...' );
		if ( hasSenseGoYmlLocal ) {
			var userConfigLocal = senseGo.loadYml( path.join( process.cwd(), '.sense-go.local.yml' ) );
			userConfig = extend( userConfig, userConfigLocal );
			log( 'Extending with settings in  the .sense-go.local.yml file ...' );
		}

		senseGo.init( userConfig, function () {
			senseGo.run( toRun );
		} );
	} else if ( hasSenseGoJs ) {
		log( 'Using the sense-go.js file ...' );
		require( senseGoJsFile );
		senseGo.run( toRun );
	} else {

		log( 'Using the default sense-go settings ...' );
		log( '\t(neither package.json nor .sense-go.yml available ...)' );
		senseGo.init( gulp, function () {
			senseGo.run( toRun );
		} );
	}

}

// fix stdout truncation on windows
function exit ( code ) {
	if ( process.platform === 'win32' && process.stdout.bufferSize ) {
		process.stdout.once( 'drain', function () {
			process.exit( code );
		} );
		return;
	}
	process.exit( code );
}
