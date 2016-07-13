'use strict';

// local dependencies
var spawn = require( 'spawn-cmd' ).spawn;

function NpmTasks ( gulp, plugins, config, taskUtils ) {

	gulp.task( 'npm:publish', function ( done ) {

		if ( config.npm.publish === true ) {
			spawn( 'npm', ['publish'], {stdio: 'inherit', cwd: process.cwd()} )
				.on( 'error', function ( err ) {
					console.error( 'error', err );
				} )
				.on( 'close', done )
				.on( 'data', function ( data ) {
					console.log( data );
				} )
		} else {
			done();
		}
	} );
}

module.exports = NpmTasks;
