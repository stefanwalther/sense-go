'use strict';
// core dependencies
var fs = require( 'fs' );
var path = require( 'path' );

// local dependencies
var _ = require( 'lodash' );
var glob = require( 'glob' );
var mkdirp = require( 'mkdirp' );

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
						done( err );
					} );
				} );
			} )
		} else {
			done();
		}
	}

	gulp.task( 'wbfolder', function ( done ) {
		if ( config.wbfolder.enabled === true ) {
			var taskConfig = {
				enabled: config.wbfolder.enabled,
				cwd: config.wbfolder.cwd,
				src: config.wbfolder.src,
				dest: path.resolve(config.wbfolder.dest)
			};
			console.log('taskConfig', taskConfig);
			createWbFolderFile( taskConfig, done );
		} else {
			done();
		}
	} )

}

module.exports = WbFolderTask;
