'use strict';

function WatchTasks() {

	gulp.task( 'watch:build', function () {
		gulp.watch(
			['./src/**/*.*'],
			{
				readDelay: 10,
				usePolling: true,
				interval: 50
			},
			gulp.series( 'build' ) )
	} );

}

module.exports = WatchTasks;
