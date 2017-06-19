'use strict';

function CssMinTasks ( gulp, plugins, config, taskUtils ) {

	var cleanCss = function ( taskConfig, done ) {
		return gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.cleanCss( { rebase: false} ) )
			.pipe( plugins.rename( {
				suffix: '.min'
			} ) )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on('end', function () {
				if (typeof done === 'function') {
					done();
				}
			});
	};

	gulp.task( 'cleanCss:tmp', function ( done ) {
		return cleanCss( {
			taskName: 'cleanCss:tmp',
			src: config.cleanCssTmp.src,
			dest: config.cleanCssTmp.dest
		}, done )
	} );

	return {
		cleanCss: cleanCss
	}
}

module.exports = CssMinTasks;
