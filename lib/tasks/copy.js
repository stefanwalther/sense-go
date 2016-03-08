'use strict';
var path = require( 'path' );
var gutil = require( 'gulp-util' );

function CopyTasks ( gulp, plugins, config, taskUtils ) {

	/**
	 * Generic copy task
	 * @param taskConfig { src, dest }
	 * @param done
	 */
	function copy ( taskConfig ) {
		return gulp.src( taskConfig.src )
			.pipe( plugins.plumber() )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.plumber.stop() )
			.pipe( gulp.dest( taskConfig.dest ) )
	}

	gulp.task( 'copy:toTmp', function ( done ) {
		return copy( {
			taskName: 'copy:toTmp',
			src: [
				path.resolve( config.srcDir + '/**/*.*' ),
				'!' + path.resolve( config.srcDir + '/**/*.less' )
			],
			dest: config.tmpDir
		}, done )
	} );

	gulp.task( 'copy:tmpToDev', function () {
		return copy( {
			taskName: 'copy:tmpToDev',
			src: [
				path.resolve( config.tmpDir + '/**/*.*' ),
				'!' + path.resolve( config.tmpDir + '/**/*.less' ),
				'!' + path.resolve( config.tmpDir + '/test/**/*.*' )
			],
			dest: config.buildDevDir
		} );
	} );

	gulp.task( 'copy:tmpToRelease', function () {
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

	gulp.task( 'copy:tmpMeta', function () {
		return copy( {
			taskName: 'copy:tmpMeta',
			src: [
				path.resolve( './LICENSE.md' ),
				path.resolve( './README.md' )
			],
			dest: config.tmpDir
		} )
	} );

	gulp.task( 'deploy:toLocal', function () {

		if ( config.deployment.toLocal.enabled === true ) {

			return copy( {
				taskName: 'deploy:toLocal',
				src: [
					path.resolve( config.tmpDir + '/**/*.*' ),
					'!' + path.resolve( config.tmpDir + '/**/*.less' ),		// Don't include .less files
					'!' + path.resolve( config.tmpDir + '/test/**/*.*' )	// Don't include any tests
				],
				dest: config.localExtensionPath
			} )
		} else {
			return gulp.src( '.' )
				.pipe( plugins.nop() );
		}
	} );

}

module.exports = CopyTasks;

