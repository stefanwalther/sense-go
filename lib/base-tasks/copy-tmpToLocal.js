'use strict';
var gUtil = require( 'gulp-util' );
var qlikloc = require('qlikloc');
var path = require('path');

module.exports = function ( gulp , cfg, plugins ) {

	return function ( ) {
		return qlikloc.getExtensionPath()
			.then( function ( extensionPath ) {
				var destPath = path.join( extensionPath, cfg.packageName );
				gUtil.log('Copy ' + cfg.tmpDir + ' to ' + destPath);
				gulp.src(cfg.tmpDir + '/**/*.*')
					.pipe(gulp.dest(  destPath ));
			});
	};
};