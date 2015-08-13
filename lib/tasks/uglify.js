'use strict';

function UglifyTasks ( gulp, plugins, config, taskUtils ) {

	function uglify ( taskConfig, done ) {
		gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.stripDebug())
			.pipe( plugins.uglify( taskConfig.uglify ) )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on( 'end', function () {
				done();
			} );
	}

	gulp.task( 'uglify:tmp', function ( done ) {
		uglify( {
			taskName: 'uglify:tmp',
			src: [config.tmpDir + '/**/*.js', '!' + config.tmpDir + '/**/*.min.js'],
			dest: config.tmpDir,
			uglify: config.uglify
		}, done )
	} );

}

module.exports = UglifyTasks;
