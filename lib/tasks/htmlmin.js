'use strict';

// core dependencies
var path = require( 'path' );

function HtmlMinTasks ( gulp, plugins, config, taskUtils ) {

	var htmlmin = function( taskConfig, done) {
		return gulp.src( taskConfig.src )
			.pipe( plugins.htmlmin( config.htmlmin ) )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on('end', function () {
				if (typeof done === 'function') {
					done();
				}
			});
	};

	gulp.task( 'htmlmin:tmp', function ( done ) {
		return htmlmin( {
			taskName: 'htmlmin:tmp',
			src: path.resolve( config.tmpDir + '/**/*.htm[l]' ),
			dest: config.tmpDir
		}, done )
	} );

	return {
		htmlmin: htmlmin
	}
}

module.exports = HtmlMinTasks;
