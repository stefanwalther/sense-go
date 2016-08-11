'use strict';
var GulpSsh = require( 'gulp-ssh' );
var path = require( 'path' );

function SshTasks ( gulp, plugins, config, taskUtils ) {

	function getGulpSshInst( instConfig ) {
		return new GulpSsh( {
			ignoreErrors: false,
			sshConfig: instConfig,
			gulp: gulp
		} );
	}

	gulp.task( 'deploy:toSsh', function () {

		if ( config.deployment.toSsh.enabled ) {

			var gulpSsh = new getGulpSshInst( config.deployment.toSsh );

			return gulp
				.src( [
					path.resolve( config.tmpDir + '/**/*.*' ),
					'!' + path.resolve( config.tmpDir + '/**/*.less' ),		// Don't include .less files
					'!' + path.resolve( config.tmpDir + '/test/**/*.*' )	// Don't include any tests
				] )
				.pipe( gulpSsh.dest( config.deployment.toSsh.dest ) )
				.on('end', function() { gulpSsh.close(); });

		} else {
			return gulp.src( '.' ).pipe( plugins.nop() );
		}

	} );

	gulp.task('import:fromSsh', function() {

		if (config.import.fromSsh.enabled) {
			var gulpSsh = new getGulpSshInst( config.import.fromSsh);



		}

	})

}

module.exports = SshTasks;
