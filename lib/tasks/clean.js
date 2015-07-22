'use strict';
var del = require('del');
var _ = require('lodash');
var path = require('path');

function CleanTasks ( gulp, plugins, config, taskUtils ) {

	var that = this;
	/**
	 * Generic delete/clean task
	 * @param taskConfig { src }
	 * @param done
	 * @returns {*}
	 */
	function clean ( taskConfig, delOptions, done ) {
		del( taskConfig.src, delOptions, function ( err, paths ) {
			taskUtils.log( 'del paths', paths );
			done( err );
		} );
	}

	gulp.task( 'clean:tmp', function ( done ) {
		clean( {src: path.resolve( config.tmpDir )}, {}, done );
	} );

	gulp.task( 'clean:buildDev', function ( done ) {
		clean( {src: path.resolve( config.buildDevDir )}, {}, done );
	} );

	gulp.task( 'clean:localExtensionDir', function ( done ) {
		if ( !_.isEmpty( config.packageName ) ) {
			clean( { src: config.localExtensionPath }, {force: true}, done );
		}
	} );
}

module.exports = CleanTasks;