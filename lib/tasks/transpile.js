'use strict';

function TranspileTask( gulp, plugins, config, taskUtils) {

	function transpile ( taskConfig, done ) {
		gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.babel() )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on( 'end', function () {
				done();
			} );
	}

	gulp.task('transpile', function ( done ) {
		transpile( {
			src: config.transpile.src,
			dest: config.transpile.dest
		}, done)
	});
}

module.exports = TranspileTask;
