'use strict';

// local dependencies
const exec = require( 'child_process' ).exec;
const async = require( 'async' );

// local dependencies
var gUtil = require( 'gulp-util' );

function ShellTasks ( gulp, plugins, config, taskUtils ) {

	gulp.task( 'shell', function ( cbMain ) {

		var tasks = [];
		if ( config.shell && config.shell.enabled && config.shell.tasks.length > 0 ) {

			config.shell.tasks.forEach( function ( task ) {
				tasks.push(
					function ( cb ) {
						exec( task, function ( err, stdout, stderr ) {
							return cb( err );
						} )
					}
				);
			} );

			async.parallel( tasks, function ( errors, results ) {
				return cbMain( errors );
			} );
		} else {
			gUtil.log( gUtil.colors.gray( 'Task "shell" is disabled' ) );
			return gulp.src( '.' )
				.pipe( plugins.nop() );
		}
	} );

}

module.exports = ShellTasks;
