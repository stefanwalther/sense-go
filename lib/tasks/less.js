'use strict';

// core dependencies
var path = require( 'path' );
var fs = require( 'fs' );

// local dependencies
var gulpUtil = require( 'gulp-util' );

function LessTasks ( gulp, plugins, config, taskUtils ) {

	function less ( taskConfig ) {
		return gulp.src( taskConfig.src )
			//.pipe( plugins.sourcemaps.init() )
			.pipe( plugins.autoprefixer() )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.less( {
				compress: true
			} ) )
			//.pipe( plugins.sourcemaps.write() )
			.pipe( gulp.dest( taskConfig.dest ) );
	}

	gulp.task( 'less:reduce', function ( done ) {

		var taskConfig = {
			taskName: 'less:reduce',
			src: path.resolve( config.lessReduce.src ),
			dest: path.resolve( config.lessReduce.dest )
		};
		if ( fs.existsSync( taskConfig.src ) ) {
			return less( taskConfig )
		} else {
			gulpUtil.log( 'less:reduce', gulpUtil.colors.green( '0 items' ));
			done();
		}
	} );

	gulp.task( 'less:each', function () {
		return less( {
			taskName: 'less:each',
			src: path.resolve( config.lessEach.src ),
			dest: path.resolve( config.lessEach.dest )
		} );
	} )
}

module.exports = LessTasks;
