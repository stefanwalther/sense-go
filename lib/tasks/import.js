'use strict';
var path = require( 'path' );

function ImportTasks ( gulp, plugins, config, taskUtils ) {

	function doImport ( taskConfig, done ) {

		if ( taskConfig.importDef && taskConfig.importDef.files ) {
			taskUtils.debug( taskConfig.taskName );
			taskConfig.importDef.files.forEach( function ( fileDef ) {
				gulp.src( fileDef[0] )
					.pipe( taskUtils.debug( taskConfig ) )
					.pipe( gulp.dest( fileDef[1] ) )
			} );
			done();
		} else {
			done();
		}
	}

	gulp.task( 'import', function ( done ) {

		doImport( {
			taskName: "import",
			importDef: config.import
		}, done );
	} );

}

module.exports = ImportTasks;
