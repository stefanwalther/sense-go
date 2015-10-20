'use strict';
var path = require( 'path' );

function LessTasks ( gulp, plugins, config, taskUtils ) {

	function less ( taskConfig ) {
		return gulp.src( taskConfig.src )
			.pipe( plugins.sourcemaps.init() )
			.pipe( plugins.autoprefixer() )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.less( {
				compress: true
			} ) )
			.pipe( plugins.sourcemaps.write() )
			.pipe( gulp.dest( taskConfig.dest ) );
	}

	gulp.task( 'less:reduce', function ( ) {
		return less( {
			taskName: 'less:reduce',
			src: path.resolve( config.srcDir + '/lib/less/main.less' ),
			dest: config.tmpDir + '/lib/css/'
		} )
	} );

	gulp.task( 'less:each', function (  ) {
		return less( {
			taskName: 'less:each',
			src: path.resolve( config.srcDir + '/**/*.less' ),
			dest: config.tmpDir
		} );
	} )

}

module.exports = LessTasks;
