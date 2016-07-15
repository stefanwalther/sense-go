'use strict';

function UglifyTasks ( gulp, plugins, config, taskUtils ) {

	function uglify ( taskConfig ) {
		return gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.stripDebug())
			.pipe( plugins.uglify( taskConfig.uglify ) )
			.pipe( gulp.dest( taskConfig.dest ) );
	}

	gulp.task( 'uglify:tmp', function (  ) {
		return uglify( {
			taskName: 'uglify:tmp',
			src: [config.tmpDir + '/**/*.{js}', '!' + config.tmpDir + '/**/*.min.js'],
			dest: config.tmpDir,
			uglify: config.uglify
		} );
	} );

}

module.exports = {
	default: UglifyTasks
};
