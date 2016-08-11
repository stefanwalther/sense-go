'use strict';
var GulpSsh = require( 'gulp-ssh' );
var path = require( 'path' );
var _ = require('lodash');

function SshTasks ( gulp, plugins, config, taskUtils ) {

	function getGulpSshInst ( instConfig ) {
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
				.pipe( plugins.debug( {title: "deploy:toSsh", minimal: true} ) )
				.pipe( gulpSsh.dest( config.deployment.toSsh.dest ) )
				.on( 'end', function () { gulpSsh.close(); } );

		} else {
			return gulp.src( '.' ).pipe( plugins.nop() );
		}

	} );

	/**
	 * Supports both, either just to define src & def or to define a collection of files
	 */
	gulp.task( 'import:fromSsh', function () {

		if ( config.import.fromSsh.enabled ) {
			var gulpSsh = new getGulpSshInst( config.import.fromSsh );

			var tasks = [];
			var targets = [];
			if ( !_.isEmpty(config.import.fromSsh.src) && !_.isEmpty(config.import.fromSsh.dest) ) {
				targets.push( {
					src: config.import.fromSsh.src,
					dest: config.import.fromSsh.dest
				} )
			}
			if ( config.import.fromSsh.files && config.import.fromSsh.files.length > 0 ) {
				config.import.fromSsh.files.forEach( function( file ) {
					if (!_.isempty(file.src) && !_.isEmpty(file.dest)) {
						targets.push( file )
					}
				});
			}

			targets.forEach( function ( target ) {
				tasks.push(
					gulpSsh.sftp( 'read', target.src )
						.pipe( plugins.rename( {dirname: ''} ) )
						.pipe( plugins.debug( {title: "import:fromSsh", minimal: true} ) )
						.pipe( gulp.dest( target.dest ) )
						.on( 'end', function () { gulpSsh.close();} )
				);
			} );

			return tasks;
		}

	} )

}

module.exports = SshTasks;
