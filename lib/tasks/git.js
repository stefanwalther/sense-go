'use strict';
var path = require('path');
var parseArgs = require( 'minimist' );

function GitTasks ( gulp, plugins, config, taskUtils ) {

	function getArgs() {

		var defaultArgs = {
			string: ['m'],
			default: {
				m: '-'
			}
		};
		var cliArgs = parseArgs( process.argv.slice( 2 ), defaultArgs );
		return cliArgs;
	}

	gulp.task('git:push', function ( done ) {

		var target = 'origin';
		var source = 'master';

		taskUtils.debug( {taskName: 'git:push'} );
		plugins.git.push(target, source, function (err) {
			if (err) throw err;
			done();
		});
	});

	gulp.task('git:commit', function ( done ) {

		var cliArgs = getArgs();

		return gulp.src('./')
			.pipe(taskUtils.debug( {taskName: 'git:commit'} ))
			.pipe(plugins.git.commit(cliArgs.m))
			.on('end', function (  ) {
				done();
			});
	});
}

module.exports = GitTasks;
