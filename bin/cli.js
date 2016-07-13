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
var senseGo = require( './../lib/' );
var Liftoff = require( 'liftoff' );
var v8flags = require( 'v8flags' );
var log = require( './log' );

var pkg = require( '../package' );
var taskTree = require( './task-tree' );

// store a reference to the current CWD
process.env.INIT_CWD = process.cwd();

var cli = new Liftoff( {
	name: 'verb',
	//extensions: { '.js': null, '.coffee': 'coffee-script/register' },
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
var tasksFlag = argv.T || argv.tasks;
var hasSenseGoYml = fs.existsSync( path.join( process.cwd(), '.sense-go.yml' ) );
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

	// chdir before requiring `sense-go.js` to allow users to chdir as needed
	if ( process.cwd() !== env.cwd ) {
		process.chdir( env.cwd );
		log( 'Working directory changed to', tildify( env.cwd ) );
	}

	if ( hasSenseGoYml && !hasSenseGoJs ) {
		var userConfig = senseGo.loadYml( path.join( process.cwd(), '.sense-go.yml' ) );
		log( 'Using the .sense-go.yml file ...' );
		senseGo.init( gulp, userConfig, function () {
			senseGo.run( toRun );
		} );
	} else if ( hasSenseGoJs ) {
		log( 'Using the sense-go.js file ...' );
		require( senseGoJsFile );
		senseGo.run(toRun);
	} else {

		log( 'Using the default sense-go settings ...' );
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
