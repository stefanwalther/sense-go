const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = require('fancy-log');

/**
 * Create tasks based on the existing plugins & configuration
 * @param {object} gulp - Gulp reference.
 * @param {object} plugins - Loaded gulp plugins.
 * @param {object} config - User configuration.
 * @constructor
 */
const TaskCreator = function (gulp, plugins, config) {

  // ****************************************************************************************
  // Private methods
  // ****************************************************************************************

  const taskUtils = require('./taskUtils')(plugins, config);

  /**
	 * Load all tasks from 'tasks' folder.
	 * Tasks must have the same signature
	 *
	 * TaskName( gulp, plugins, config, taskUtils)
	 *
	 * @private
	 */
  const _loadTasks = function () {
    const normalizedPath = path.join(__dirname, 'tasks');

    fs.readdirSync(normalizedPath).forEach(function (file) {
      require('./tasks/' + file)(gulp, plugins, config, taskUtils);
    });
  };

  const _gulpTasks = function () {
    gulp.task('default', function (done) {
      log(chalk.red('sense-go does not provide any default task out of the box.'));
      log(chalk.red('Run at least one task, e.g. "sense-go build"'));
      done();
    });

    // Create task-chains from config
    if (config.taskChains) {
      // eslint-disable-next-line guard-for-in
      for (let task in config.taskChains) {
        // Console.info('Creating task ', config.taskChains[task]);
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
  const _gulpConfig = function () {

  };

  const init = function () {

    _gulpConfig();
    _loadTasks();

    // Finally create the final task chains
    _gulpTasks();

  };

  init();

};

module.exports = TaskCreator;
