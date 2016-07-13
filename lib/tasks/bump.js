'use strict';
// core dependencies
var path = require( 'path' );

// local dependencies
var parseArgs = require( 'minimist' );

function BumpTasks ( gulp, plugins, config, taskUtils ) {

	function increment ( importance ) {

		var defaultArgs = {
			bool: ['tag', 'push'],
			string: 'commit',
			default: {
				tag: false,
				push: false,
				commit: false
			}
		};

		var cliArgs = parseArgs( process.argv.slice( 2 ), defaultArgs );
		var isCommit = false;
		if ( typeof cliArgs.commit === 'string' && cliArgs.commit.length === 0 ) {
			cliArgs.commit = '.';
			isCommit = true;
		}

		return gulp.src( [path.join( process.cwd(), 'package.json' )] )
			.pipe( plugins.bump( {type: importance} ) )
			.pipe( gulp.dest( './' ) )
			.pipe( plugins.filter( 'package.json' ) )
			//.pipe( $$.if( isCommit , $$.git.commit( cliArgs.commit ) ))
			.pipe( plugins.if( cliArgs.tag === true, plugins.tagVersion() ) )
			.pipe( plugins.touch()); // temporary workaround because of https://github.com/zurb/foundation-sites/issues/8544
	}

	function setVersion() {
		var defaultArgs = {
			string: ['newVersion', 'nv'],
			default: {
				nv: null,
				newVersion: null
			}
		};
		var cliArgs = parseArgs( process.argv.slice( 2 ), defaultArgs );

		var userDefinedVersion = cliArgs.newVersion || cliArgs.nv;

		return gulp.src( [path.join( process.cwd(), 'package.json' )] )
			.pipe( plugins.bump( {version: userDefinedVersion} ) )
			.pipe( gulp.dest( './' ) )
			.pipe( plugins.filter( 'package.json' ) )
			.pipe( plugins.touch()); // temporary workaround because of https://github.com/zurb/foundation-sites/issues/8544
	}

	gulp.task( 'bump', function () { return increment( 'patch' );} );
	gulp.task( 'bump:patch', function () { return increment( 'patch' ); } );
	gulp.task( 'bump:minor', function () { return increment( 'minor' ); } );
	gulp.task( 'bump:major', function () { return increment( 'major' ); } );
	gulp.task( 'bump:version', function () { return setVersion();} );

	// Shortcuts
	gulp.task( 'b', gulp.series( 'bump' ) );
	gulp.task( 'b:p', gulp.series( 'bump:patch' ) );
	gulp.task( 'b:min', gulp.series( 'bump:minor' ) );
	gulp.task( 'b:maj', gulp.series( 'bump:major' ) );

}
module.exports = BumpTasks;
