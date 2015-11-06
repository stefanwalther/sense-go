'use strict';
var path = require( 'path' );

function HtmlMinTasks ( gulp, plugins, config, taskUtils ) {

	function htmlmin ( taskConfig, done ) {
		return gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.htmlmin( {
				collapseWhitespace: true,
				preserveLineBreaks: true,
				removeComments: true
			} ) )
			.pipe( gulp.dest( taskConfig.dest ) )
	}

	gulp.task( 'htmlmin:tmp', function ( done ) {
		return htmlmin( {
			taskName: 'htmlmin:tmp',
			src: path.resolve( config.tmpDir + '/**/*.htm[l]' ),
			dest: config.tmpDir
		}, done )
	} );
}

module.exports = HtmlMinTasks;
