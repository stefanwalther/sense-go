'use strict';
var path = require( 'path' );

function CopyTasks ( gulp, plugins, config, taskUtils ) {

	/**
	 * Generic copy task
	 * @param taskConfig { src, dest }
	 * @param done
	 */
	function copy ( taskConfig ) {
		return gulp.src( taskConfig.src )
			.pipe(plugins.plumber())
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe(plugins.plumber.stop())
			.pipe( gulp.dest( taskConfig.dest ) )
	}

	gulp.task( 'copy:toTmp', function ( done ) {
		return copy( {
			taskName: 'copy:toTmp',
			src: [
				path.resolve( config.srcDir + '/**/*.*' ),
				'!' + path.resolve( config.srcDir + '/**/*.less' )
			],
			dest: config.tmpDir}, done )
	} );

	gulp.task( 'copy:tmpToDev', function (  ) {
		return copy( {
			taskName: 'copy:tmpToDev',
			src: [
				path.resolve( config.tmpDir + '/**/*.*' ),
				'!' + path.resolve( config.tmpDir + '/**/*.less' ),
				'!' + path.resolve( config.tmpDir + '/test/**/*.*' )
			],
			dest: config.buildDevDir
		} )
	} );

	gulp.task( 'copy:tmpToRelease', function ( ) {
		return copy( {
			taskName: 'copy:tmpToRelease',
			src: [
				path.resolve( config.tmpDir + '/**/*.*' ),
				'!' + path.resolve( config.tmpDir + '/**/*.less' ),
				'!' + path.resolve( config.tmpDir + '/test/**/*.*' )
			],
			dest: config.buildReleaseDir
		} )
	} );

	gulp.task( 'copy:tmpMeta', function ( ) {
		return copy( {
			taskName: 'copy:tmpMeta',
			src: [
				path.resolve( './LICENSE.md' ),
				path.resolve( './README.md' )
			],
			dest: config.tmpDir
		} )
	} );

	gulp.task( 'copy:tmpToLocal', function ( ) {
		return copy( {
			taskName: 'copy:tmpToLocal',
			src: [
				path.resolve( config.tmpDir + '/**/*.*' ),
				'!' + path.resolve( config.tmpDir + '/**/*.less' ),
				'!' + path.resolve( config.tmpDir + '/test/**/*.*' )
			],
			dest: config.localExtensionPath
		} )
	} );

}

module.exports = CopyTasks;
