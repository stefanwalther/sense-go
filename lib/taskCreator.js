'use strict';
// Node.js dependencies
var fs = require('fs');
var path = require('path');

// Local dependencies
var chalk = require('chalk');
var gutil = require('gulp-util');

/**
 * Create tasks based on the existing plugins & configuration
 * @param {object} gulp - Gulp reference.
 * @param {object} plugins - Loaded gulp plugins.
 * @param {object} config - User configuration.
 * @constructor
 */
var TaskCreator = function (gulp, plugins, config) {

  // ****************************************************************************************
  // Private methods
  // ****************************************************************************************

  var taskUtils = require('./taskUtils')(plugins, config);

  /**
	 * Load all tasks from 'tasks' folder.
	 * Tasks must have the same signature
	 *
	 * TaskName( gulp, plugins, config, taskUtils)
	 *
	 * @private
	 */
  var _loadTasks = function () {
    var normalizedPath = path.join(__dirname, 'tasks');

    fs.readdirSync(normalizedPath).forEach(function (file) {
      require('./tasks/' + file)(gulp, plugins, config, taskUtils);
    });
  };

  var _gulpTasks = function () {
    gulp.task('default', function (done) {
      gutil.log(chalk.red('sense-go does not provide any default task out of the box.'));
      gutil.log(chalk.red('Run at least one task, e.g. "sense-go build"'));
      done();
    });

    // Create task-chains from config
    if (config.taskChains) {
      // eslint-disable-next-line guard-for-in
      for (var task in config.taskChains) {
        gulp.task(task, gulp.series(config.taskChains[task]));
      }
    }

  };

  /**
	 * Gulp task for some internal asynchronous configuration.
	 *
	 * @todo Check how we can enforce this
	 *
	 * @private
	 */
  var _gulpConfig = function () {

  };

  var init = function () {

    _gulpConfig();
    _loadTasks();

    // Finally create the final task chains
    _gulpTasks();

  };

  init();

};

module.exports = TaskCreator;
