'use strict';

module.exports = function ( gulp, cfg, plugins ) {

	/**
	 * Increment the current version in the package.json fle
	 * @param importance Can be either 'patch', 'minor' or 'major'
	 *
	 * @see //https://www.npmjs.com/package/gulp-tag-version
	 * @returns {*}
	 */
	function inc ( importance ) {
		return gulp.src( ['./package.json'] )
			.pipe( plugins.bump( {type: importance} ) )
			.pipe( gulp.dest( './' ) )
			.pipe( plugins.git.commit( args.msg ) )
			.pipe( plugins.filter( 'package.json' ) )
			.pipe( plugins.tagVersion() );
	}

	return function (  ) {

		gulp.task( 'patch', function () { return inc( 'patch' ); } );
		gulp.task( 'minor', function () { return inc( 'minor' ); } );
		gulp.task( 'major', function () { return inc( 'major' ); } );
	};

};






