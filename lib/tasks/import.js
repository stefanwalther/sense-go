'use strict';
var path = require( 'path' );
var fs = require('fs-extra');

function ImportTasks ( gulp, plugins, config, taskUtils ) {

	function doImport ( taskConfig, done ) {

		if ( taskConfig.importDef && taskConfig.importDef.files ) {
			taskUtils.debug( taskConfig.taskName );
			taskConfig.importDef.files.forEach( function ( fileDef ) {
				fs.copySync( path.resolve(fileDef[0]), path.resolve(fileDef[1]))
			});
			done();
		} else {
			done();
		}
	}

	gulp.task( 'import', function ( done ) {
		return doImport( {
			taskName: "import",
			importDef: config.import
		}, done );
	} );

}

module.exports = ImportTasks;
