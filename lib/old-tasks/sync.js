'use strict';

// local dependencies
var path = require( 'path' );

// local dependencies
var gUtil = require( 'gulp-util' );
var fs = require( 'fs-extra' );
var mkdirp = require( 'mkdirp' );
var tildify = require( 'tildify' );

function ImportTasks ( gulp, plugins, config, taskUtils ) {

	// function doSync ( taskConfig, done ) {
	//
	// 	var src = '/cygdrive/c/Users/stefanwalther/Documents/Qlik/Sense/Apps/Test-App.qvf';
	// 	var dest = '~/git/stefanwalther/sense-components/examples';
	// 	var host = '192.168.56.13';
	//
	// 	return gulp.src( './examples' )
	// 		.pipe( plugins.rsync({
	// 			root: src,
	// 			hostname: host,
	// 			destination: dest,
	// 			recursive: true,
	// 			force: true
	// 		}))
	//
	//
	// }
	//
	// gulp.task( 'sync', function ( done ) {
	// 	return doSync( {
	// 		taskName: "sync",
	// 		importDef: config.import.fromLocal
	// 	}, done );
	// } );

}

module.exports = ImportTasks;
