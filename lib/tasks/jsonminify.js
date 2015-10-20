'use strict';

function JsonMinify ( gulp, plugins, config, taskUtils ) {

	function jsonminify ( taskConfig ) {
		return gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.jsonminify() )
			.pipe( gulp.dest( taskConfig.dest ) );
	}

	gulp.task( 'jsonminify:tmp', function ( done ) {
		return jsonminify( {
			taskName: 'jsonminify.tmp',
			src: [config.tmpDir + '/**/*.{json,qext}'],
			dest: config.tmpDir
		}, done )
	} );
}

module.exports = JsonMinify;
