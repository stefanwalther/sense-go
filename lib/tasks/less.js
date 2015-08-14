'use strict';
var path = require( 'path' );

function LessTasks ( gulp, plugins, config, taskUtils ) {

	function less ( taskConfig, done ) {
		gulp.src( taskConfig.src )
			.pipe( plugins.sourcemaps.init() )
			.pipe( plugins.autoprefixer() )
			.pipe( taskUtils.debug( taskConfig ) )
			.pipe( plugins.less( {
				compress: true
			} ) )
			.pipe( plugins.sourcemaps.write() )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on( 'end', function () {
				done();
			} );
	}

	gulp.task( 'less:reduce', function ( done ) {
		less( {
			taskName: 'less:reduce',
			src: path.resolve( config.srcDir + '/lib/less/main.less' ),
			dest: config.tmpDir + '/lib/css/'
		}, done )
	} );

	gulp.task( 'less:each', function ( done ) {
		less( {
			taskName: 'less:each',
			src: path.resolve( config.srcDir + '/**/*.less' ),
			dest: config.tmpDir
		}, done )
	} )

}

module.exports = LessTasks;
