'use strict';
var path = require('path');
var parseArgs = require( 'minimist' );

function BumpTasks( gulp, plugins, config, taskUtils) {

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
		if (typeof cliArgs.commit === 'string' && cliArgs.commit.length === 0) {
			cliArgs.commit = '.';
			isCommit = true;
		}

		return gulp.src( [path.join(process.cwd(), 'package.json')] )
			.pipe( plugins.bump( {type: importance} ) )
			.pipe( gulp.dest( './' ) )
			.pipe( plugins.filter( 'package.json' ) )
			//.pipe( $$.if( isCommit , $$.git.commit( cliArgs.commit ) ))
			.pipe( plugins.if( cliArgs.tag === true, plugins.tagVersion() ));
	}

	gulp.task( 'bump', function (  ) { return increment('patch');});
	gulp.task( 'bump:patch', function () { return increment( 'patch' ); } );
	gulp.task( 'bump:minor', function () { return increment( 'minor' ); } );
	gulp.task( 'bump:major', function () { return increment( 'major' ); } );

}

module.exports = BumpTasks;
