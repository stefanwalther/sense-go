'use strict';
// core dependencies
var fs = require( 'fs' );
var path = require( 'path' );

// local dependencies
var _ = require( 'lodash' );
var glob = require( 'glob' );
var mkdirp = require( 'mkdirp' );
var gUtil = require( 'gulp-util' );

function WbFolderTask ( gulp, plugins, config, taskUtils ) {

	function createWbFolderFile ( taskConfig, done ) {

		if ( taskConfig.enabled === true ) {
			glob( taskConfig.src, {cwd: taskConfig.cwd}, function ( err, files ) {
				var wbFolderContent = [];
				var lineSep = ';\r\n';

				files.forEach( function ( file ) {
					if ( !file.toLowerCase().indexOf( 'wbfolder.wbl' ) > -1 ) {
						wbFolderContent.push( _.trimStart( file, './' ) );
					}
				} );
				mkdirp( path.dirname( taskConfig.dest ), function () {
					fs.writeFile( taskConfig.dest, wbFolderContent.join( lineSep ), function ( err ) {
						if ( err ) {
							return console.error( 'An error occurred while saving the wbfolder.wbl file.\n', err ); //Todo: better error-handling & -output
						}
						gUtil.log( taskConfig.taskName, gUtil.colors.green('File created with ' + files.length + ' items'));
						done( err );
					} );
				} );
			} )
		} else {
			done();
		}
	}

	gulp.task( 'wbfolder:tmp', function ( done ) {
		if ( config.wbfolder.enabled === true ) {
			var taskConfig = {
				taskName: 'wbfolder:tmp',
				enabled: config.wbfolder.enabled,
				cwd: config.wbfolder.cwd,
				src: config.wbfolder.src,
				dest: path.resolve(config.wbfolder.dest)
			};
			createWbFolderFile( taskConfig, done );
		} else {
			return gulp.src( '.' )
				.pipe( plugins.nop() );
		}
	} )

}

module.exports = WbFolderTask;
