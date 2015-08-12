'use strict';
var path = require('path');

function GitTasks ( gulp, plugins, config, taskUtils ) {

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

		var message = '-';

		return gulp.src('./')
			.pipe(taskUtils.debug( {taskName: 'git:commit'} ))
			.pipe(plugins.git.commit(message))
			.on('end', function (  ) {
				done();
			});
	});
}

module.exports = GitTasks;
