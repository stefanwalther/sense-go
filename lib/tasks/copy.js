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
		copy( {
			taskName: 'copy:toTmp',
			src: [
				path.resolve( config.srcDir + '/**/*.*' ),
				'!' + path.resolve( config.srcDir + '/**/*.less' )
			],
			dest: config.tmpDir}, done )
	} );

	gulp.task( 'copy:tmpToDev', function ( done ) {
		copy( {
			taskName: 'copy:tmpToDev',
			src: [
				path.resolve( config.tmpDir + '/**/*.*' ),
				'!' + path.resolve( config.tmpDir + '/**/*.less' ),
				'!' + path.resolve( config.tmpDir + '/test/**/*.*')
			],
			dest: config.buildDevDir
		}, done )
	} );

	gulp.task( 'copy:tmpToRelease', function ( done ) {
		copy( {
			taskName: 'copy:tmpToRelease',
			src: [
				path.resolve( config.tmpDir + '/**/*.*' ),
				'!' + path.resolve( config.tmpDir + '/**/*.less' ),
				'!' + path.resolve( config.tmpDir + '/test/**/*.*')
			],
			dest: config.buildReleaseDir
		}, done )
	} );

	gulp.task('copy:tmpMeta', function ( done ) {
		copy( {
			taskName: 'copy:tmpMeta',
			src: [
				path.resolve('./LICENSE.md' ),
				path.resolve('./README.md' )
			],
			dest: config.tmpDir
		}, done )
	});

	gulp.task( 'copy:tmpToLocal', function ( done ) {
		copy( {
			taskName: 'copy:tmpToLocal',
			src: [
				path.resolve( config.tmpDir + '/**/*.*' ),
				'!' + path.resolve( config.tmpDir + '/**/*.less' ),
				'!' + path.resolve( config.tmpDir + '/test/**/*.*')
			],
			dest: config.localExtensionPath
		}, done )
	} );

}

module.exports = CopyTasks;
