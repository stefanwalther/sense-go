'use strict';

var gUtil = require( 'gulp-util' );

function ZipTasks ( gulp, plugins, config, taskUtils ) {

	function zip ( taskConfig ) {
		return gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.zip( taskConfig.zipFile ) )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on('end', function() {
				//console.log('zip done');
			});
	}

	/**
	 * Creates a .zip file following the pattern "%packageName%_dev.zip"
	 */
	gulp.task( 'zip:dev', function () {
		return zip( {
			taskName: 'zip:dev',
			src: config.tmpDir + '/**/*.*',
			dest: config.buildDir,
			zipFile: config.packageName + '_dev.zip'
		} );
	} );

	/**
	 * Creates a .zip file following the pattern "%packageName%_%pkg.version%.zip"
	 */
	gulp.task( 'zip:release', function () {
		return zip( {
			taskName: 'zip:release',
			src: config.tmpDir + '/**/*.*',
			dest: config.buildDir,
			zipFile: config.packageName + '_v' + config.pkg.version + '.zip'
		} );
	} );

	/**
	 * Creates a .zip file following the pattern "%packageName%_latest.zip"
	 */
	gulp.task( 'zip:latest', function () {
		return zip( {
			taskName: 'zip:latest',
			src: config.tmpDir + '/**/*.*',
			dest: config.buildDir,
			zipFile: config.packageName + '_latest.zip'
		} );
	} );
}

module.exports = {
	default: ZipTasks
};
