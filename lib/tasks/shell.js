'use strict';

// local dependencies
var exec = require( 'child_process' ).exec;
var async = require( 'async' );
var _ = require( 'lodash' );

// local dependencies
var gUtil = require( 'gulp-util' );

function ShellTasks ( gulp, plugins, config, taskUtils ) {

	gulp.task( 'shell', function ( cbMain ) {

		var tasks = [];
		if ( config.shell && config.shell.enabled && config.shell.tasks.length > 0 ) {

			config.shell.tasks.forEach( function ( task ) {
				tasks.push(
					function ( cb ) {
						gUtil.log( 'shell', gUtil.colors.blue( _.truncate(task, {length: 75} )));
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
