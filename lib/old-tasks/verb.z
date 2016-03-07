'use strict';
var path = require( 'path' );
var fs = require( 'fs' );
var gulpUtil = require( 'gulp-util' );

function VerbTasks ( gulp, plugins, config, taskUtils ) {

	function verbTask ( taskConfig ) {
		return gulp.src( [taskConfig.src] )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.verb( {dest: taskConfig.target} ) )
			.pipe( gulp.dest( taskConfig.dest ) );
	}

	gulp.task( 'verb', function ( cb ) {

		var taskConfig = {
			taskName: 'verb',
			src: path.resolve( process.cwd(), '.verb.md' ),
			target: 'README.md',
			dest: __dirname
		};
		if ( fs.existsSync( taskConfig.src ) ) {
			return verbTask( taskConfig );
		} else {
			gulpUtil.log( gulpUtil.colors( 'File ' + taskConfig.src + ' does not exist.' ) );
			cb();
		}
	} );
}

module.exports = VerbTasks;
