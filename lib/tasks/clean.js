'use strict';
var del = require( 'del' );
var _ = require( 'lodash' );
var path = require( 'path' );

function CleanTasks ( gulp, plugins, config, taskUtils ) {

	/**
	 * Generic delete/clean task
	 * @param taskConfig { src }
	 * @param done callback
	 * @returns {callback}
	 * @param delOptions
	 */
	function clean ( taskConfig, delOptions, done ) {
		return del( taskConfig.src, delOptions, function ( err, paths ) {
			taskUtils.log( 'del paths', paths );
			done( err );
		} );
	}

	gulp.task( 'clean:tmpIllegal', function ( done ) {
		return clean( {
			src: [
				config.tmpDir + '/**/*.*',
				'!' + config.tmpDir + '/**/*.{png,jpg,jpeg,json,qext,txt,js,css,eot,svg,ttf,woff,html,htm,wbl,svg}'
			]
		}, {}, done );
	} );

	gulp.task( 'clean:tmp', function ( done ) {
		return clean( {src: path.resolve( config.tmpDir )}, {}, done );
	} );

	gulp.task( 'clean:buildDev', function ( done ) {
		return clean( {src: path.resolve( config.buildDevDir )}, {}, done );
	} );

	gulp.task( 'clean:buildRelease', function ( done ) {
		return clean( {src: path.resolve( config.buildReleaseDir )}, {}, done );
	} );

	gulp.task( 'clean:localExtensionDir', function ( done ) {
		if ( !_.isEmpty( config.packageName && config.deployment.toLocal.enabled === true ) ) {
			return clean( {src: config.toLocal.extensionPath}, {force: true}, done );
		} else {
			done();
		}
	} );
}

module.exports = CleanTasks;
