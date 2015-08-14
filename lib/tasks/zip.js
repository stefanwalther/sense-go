'use strict';

function ZipTasks ( gulp, plugins, config, taskUtils ) {

	function zip ( taskConfig, done ) {
		gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.zip( taskConfig.zipFile ) )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on( 'end', function () {
				done();
			} );
	}

	gulp.task( 'zip:dev', function ( done ) {
		zip( {
			taskName: 'zip:dev',
			src: config.tmpDir + '/**/*.*',
			dest: config.buildDir,
			zipFile: config.packageName + '_dev.zip'
		}, done )
	} );

	gulp.task( 'zip:release', function ( done ) {
		zip( {
			taskName: 'zip:release',
			src: config.tmpDir + '/**/*.*',
			dest: config.buildDir,
			zipFile: config.packageName + '_v' + config.pkg.version +'.zip'
		}, done )
	} );

	gulp.task( 'zip:latest', function ( done ) {
		zip( {
			taskName: 'zip:latest',
			src: config.tmpDir + '/**/*.*',
			dest: config.buildDir,
			zipFile: config.packageName + '_latest.zip'
		}, done )
	} );

}

module.exports = ZipTasks;
