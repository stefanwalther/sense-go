var spawn = require( 'spawn-cmd' ).spawn;

function NpmTasks ( gulp, plugins, config, taskUtils ) {

	gulp.task( 'npm:publish', function ( done ) {

		spawn( 'npm', ['publish'], {stdio: 'inherit', cwd: process.cwd()} )
			.on( 'error', function ( err ) {
				console.error( 'error', err );
			} )
			.on( 'close', done )
			.on( 'data', function ( data ) {
				console.log(data);
			} )
	} );

}

module.exports = NpmTasks;
