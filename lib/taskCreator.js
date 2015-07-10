'use strict';

/**
 * Create tasks based on the existing plugins & configuration
 * @param gulp
 * @param config
 * @constructor
 */
var TaskCreator = function ( gulp, config ) {


	var init = function (  ) {

		console.log('task creator > init');
		_paramTasks();
		_copyTasks();

	};


	// ****************************************************************************************
	// Tasks
	// ****************************************************************************************
	var _copyTasks = function () {

		gulp.task('copy:toLocal', function (  ) {
			gulp.start('copy')
		});

	};

	var _paramTasks = function (  ) {
		gulp.task('param:bla', function (  ) {
			gulp.start('param');
		});
	};

	init();

};

module.exports = TaskCreator;