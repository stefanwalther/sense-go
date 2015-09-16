'use strict';

function JsonMinify ( gulp, plugins, config, taskUtils ) {

	function jsonminify ( taskConfig, done ) {
		gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.jsonminify() )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on( 'end', function () {
				done();
			} );
	}

	gulp.task( 'jsonminify:tmp', function ( done ) {
		jsonminify( {
			taskName: 'jsonminify.tmp',
			src: [config.tmpDir + '/**/*.{json,qext}'],
			dest: config.tmpDir
		}, done )
	} );
}

module.exports = JsonMinify;
