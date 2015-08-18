'use strict';
var path = require( 'path' );
var async = require( 'async' );

function ImportTasks ( gulp, plugins, config, taskUtils ) {

	function doImport ( taskConfig, done ) {

		if ( taskConfig.importDef && taskConfig.importDef.files ) {
			taskUtils.debug( taskConfig.taskName );
			async.map(taskConfig.importDef.files, function ( fileDef, callback ) {
				gulp.src( fileDef[0] )
					.pipe( taskUtils.debug( taskConfig ) )
					.pipe( gulp.dest( fileDef[1] ) )
					.on('end', function () {
						callback();
					});
			}, function ( /* err */ ) {
				done();
			});
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
