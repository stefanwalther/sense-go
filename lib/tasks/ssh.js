'use strict';
var GulpSsh = require( 'gulp-ssh' );
var path = require( 'path' );

function SshTasks ( gulp, plugins, config, taskUtils ) {

	gulp.task( 'deploy:toSsh', function () {

		if ( config.deployment.toSsh.enabled ) {

			var gulpSsh = new GulpSsh( {
				ignoreErrors: false,
				sshConfig: config.deployment.toSsh
			} );

			return gulp
				.src( [
					path.resolve( config.tmpDir + '/**/*.*' ),
					'!' + path.resolve( config.tmpDir + '/**/*.less' ),		// Don't include .less files
					'!' + path.resolve( config.tmpDir + '/test/**/*.*' )	// Don't include any tests
				] )
				.pipe( gulpSsh.dest( config.deployment.toSsh.dest ) );

		} else {
			return gulp.src( '.' )
				.pipe( plugins.nop() );
		}

	} );

}

module.exports = SshTasks;
