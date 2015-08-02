'use strict';
// core dependencies
var fs = require( 'fs' );

// local dependencies
var glob = require( 'glob' );

function WbFolderTask ( gulp, plugins, config, taskUtils ) {

	function createWbFolderFile ( taskConfig, done ) {

		glob( taskConfig.src, { cwd: taskConfig.cwd}, function ( err, files ) {
			var wbFolderContent = [];
			var lineSep = ';\r\n';
			files.forEach( function ( file ) {
				wbFolderContent.push( file );
			} );
			fs.writeFile( taskConfig.dest, wbFolderContent.join( lineSep ), function ( err ) {
				if ( err ) {
					return console.error( 'An error occured while saving the wbfolder.wbl file', err );
				}
				return done();
			} );
		} )
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
