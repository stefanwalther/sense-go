'use strict';

// local dependencies
var path = require( 'path' );

// local dependencies
var gUtil = require( 'gulp-util' );
var fs = require('fs-extra');
var mkdirp = require('mkdirp');

function ImportTasks ( gulp, plugins, config, taskUtils ) {

	function doImport ( taskConfig, done ) {

		taskUtils.debug( taskConfig );

		if ( taskConfig.importDef && taskConfig.importDef.files ) {
			taskConfig.importDef.files.forEach( function ( fileDef ) {
				//Todo: Add a glob, support copying multiple files without defining each and every one.
				var src = path.resolve(fileDef[0]);
				var dest = path.resolve(path.join(fileDef[1], path.basename(fileDef[0])));
				gUtil.log( 'Copy file from ' + gUtil.colors.blue( fileDef[0]) + ' to ' + gUtil.colors.blue(fileDef[1]));
				mkdirp.sync(path.resolve(path.join(fileDef[1])));
				//Todo: Errorhandling completely missing here
				fs.copySync( src, dest)
			});
			return done();
		} else {
			gUtil.log( taskConfig.taskName , gUtil.colors.green('Nothing to import'));
			return done();
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
