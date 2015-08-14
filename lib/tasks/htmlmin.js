'use strict';
var path = require( 'path' );

function HtmlMinTasks ( gulp, plugins, config, taskUtils ) {

	function htmlmin ( taskConfig, done ) {
		gulp.src( taskConfig.src )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.htmlmin( {
				collapseWhitespace: true,
				preserveLineBreaks: true,
				removeComments: true
			} ) )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on( 'end', function () {
				done();
			} );
	}

	gulp.task( 'htmlmin:tmp', function ( done ) {
		htmlmin( {
			taskName: 'htmlmin:tmp',
			src: path.resolve( config.tmpDir + '/**/*.html' ),
			dest: config.tmpDir
		}, done )
	} );
}

module.exports = HtmlMinTasks;
