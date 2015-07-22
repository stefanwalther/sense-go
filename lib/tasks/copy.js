'use strict';
var path = require('path');

function CopyTasks ( gulp, plugins, config, taskUtils ) {

	/**
	 * Generic copy task
	 * @param taskConfig { src, dest }
	 * @param done
	 */
	function copy ( taskConfig, done ) {
		gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on( 'end', function () {
				done();
			} );
	}

	gulp.task( 'copy:toTmp', function ( done ) {
		copy( {taskName: 'copy:toTmp', src: path.resolve( config.srcDir + '/**/*.*' ), dest: config.tmpDir}, done )
	} );
	gulp.task( 'copy:tmpToDev', function ( done ) {
		copy( {
			taskName: 'copy:tmpToDev',
			src: path.resolve( config.tmpDir + '/**/*.*' ),
			dest: config.buildDevDir
		}, done )
	} );
	gulp.task( 'copy:tmpToLocal', function ( done ) {
		copy( {
			taskName: 'copy:tmpToLocal',
			src: path.resolve( config.tmpDir + '/**/*.*' ),
			dest: config.localExtensionPath
		}, done )
	} );

}

module.exports = CopyTasks;
