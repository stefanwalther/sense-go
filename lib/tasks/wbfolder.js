'use strict';
// core dependencies
var fs = require( 'fs' );

// local dependencies
var _ = require('lodash');
var glob = require( 'glob' );

function WbFolderTask ( gulp, plugins, config, taskUtils ) {

	function createWbFolderFile ( taskConfig, done ) {

		if (config.wbfolder.enabled === true) {
			glob( taskConfig.src, {cwd: taskConfig.cwd}, function ( err, files ) {
				var wbFolderContent = [];
				var lineSep = ';\r\n';
				files.forEach( function ( file ) {
					if ( !file.toLowerCase().indexOf( 'wbfolder.wbl' ) > -1 ) {
						wbFolderContent.push( _.trimLeft( file, './' ) );
					}
				} );
				fs.writeFile( taskConfig.dest, wbFolderContent.join( lineSep ), function ( err ) {
					if ( err ) {
						return console.error( 'An error occured while saving the wbfolder.wbl file', err ); //Todo: better error-handling & -output
					}
					return done();
				} );
			} )
		} else {
			done();
		}
	}

	gulp.task( 'wbfolder', function ( done ) {
		createWbFolderFile( {
			cwd: config.wbfolder.cwd,
			src: config.wbfolder.src,
			dest: config.wbfolder.dest
		}, done );
	} )

}

module.exports = WbFolderTask;
