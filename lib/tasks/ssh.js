'use strict';
var GulpSSH = require( 'gulp-ssh' );
var path = require( 'path' );

function SshTasks ( gulp, plugins, config, taskUtils ) {

	gulp.task( 'deploy:toSSH', function () {

		if ( config.deployment.toSSH.enabled ) {

			var gulpSSH = new GulpSSH( {
				ignoreErrors: false,
				sshConfig: config.deployment.toSSH
			} );

			return gulp
				.src( [
					path.resolve( config.tmpDir + '/**/*.*' ),
					'!' + path.resolve( config.tmpDir + '/**/*.less' ),		// Don't include .less files
					'!' + path.resolve( config.tmpDir + '/test/**/*.*' )	// Don't include any tests
				] )
				.pipe( gulpSSH.dest( config.deployment.toSSH.dest ) );

		} else {
			return gulp.src( '.' )
				.pipe( plugins.nop() );
		}

	} );

}

module.exports = SshTasks;
