'use strict';
var senseGo = require('./lib/');
var gulp = senseGo.gulp; // Get the reference to the gulp instance used in sense-go

senseGo.init( function () {

	// Create a new custom task
	gulp.task('custom', function( done ) {
		console.log('Custom Task');
		done();
	});
	
	// Create a custom task chain, re-using 'build'
	gulp.task('customBuild', gulp.series(['custom', 'build']));
	
	// Run it ...
	gulp.series('customBuild')();
	
});
