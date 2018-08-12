/* global module, require */
'use strict';
const path = require('path');
const fs = require('fs-extra');
const expandTilde = require('expand-tilde');
const yaml = require('js-yaml');
const extend = require('deep-extend');
const _ = require('lodash');
const log = require('fancy-log');
const colors = require('ansi-colors');
const senseLoc = require('sense-loc');
const gulp = require('gulp');
const sanitize = require('sanitize-filename');

const SenseGo = function () {

  const defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'default-config.yml'), 'utf8'));

  let plugins = null;
  let config;

  /**
   * Initialize sense-go
   *
   * @description:
   * - Loads all required plugins.
   * - Extends default settings with custom user-defined configuration options.
   * - Performs some validation tasks.
   *
   * @param userConfig - Your configuration file
   * @param gulpObj {object} Gulp object
   * @param callback {function} Callback
   */
  function init(userConfig, callback) {

    process.emit('senseGo_onInit');

    if (typeof userConfig === 'function') {
      callback = userConfig;
      userConfig = null;
    }

    config = extend(defaultConfig, userConfig || {});

    const packagePath = path.join(process.cwd(), 'package.json');

    if (fs.existsSync(packagePath)) {
      config.pkg = require(packagePath);

      // Default package name
      if (_.isEmpty(config.packageName)) {
        config.packageName = config.pkg.name;
      }
    }

    _initConfig(config, function (err) {
      if (err) {
        return callback(err);
      }
      _loadPlugins();
      _validateConfig(err => {
        if (err && err.length > 0) {

          log(colors.white('Validation: one or more error occurred:'));
          err.forEach(function (errItem) {
            log(colors.red('  - ' + errItem));
          });
          return callback(err.concat('\n'));
        }
        _createTasks();
        callback();
      });
    });
  }

  function _initConfig(config, cb) {

    // Config (typical Windows configuration)
    // 	toLocal: true
    //	pathFetching: true
    if (config.deployment.toLocal.enabled === true && config.deployment.toLocal.pathFetching === true) {
      senseLoc.getLocalExtensionPath(function (err, data) {
        if (err) {
          return cb(err);
        }
        if (!_.isEmpty(data)) {
          config.deployment.toLocal.localExtensionsBaseDir = path.resolve(data);
          // eslint-disable-next-line no-negated-condition
          let extName = (!_.isEmpty(config.deployment.toLocal.extensionDirOverride) ? sanitize(config.deployment.toLocal.extensionDirOverride) : sanitize(config.packageName));
          config.deployment.toLocal.extensionPath = expandTilde(path.join(config.deployment.toLocal.localExtensionsBaseDir, extName));
        }
        cb(err);
      });

      // Todo: There is a bug in here ...
      // Config (typical non-Windows configuration) ==> needs extensionBaseDir
      // 	toLocal: false
      // 	pathFetching: false
    } else if (config.deployment.toLocal.enabled === true && config.deployment.toLocal.pathFetching === false) {
      if (_.isEmpty(config.deployment.toLocal.localExtensionsBaseDir)) {
        cb(new Error('config.deployment.toLocal.localExtensionsBaseDir needs to be defined.'));
      } else {
        // eslint-disable-next-line no-negated-condition
        let extName = (!_.isEmpty(config.deployment.toLocal.extensionDirOverride) ? sanitize(config.deployment.toLocal.extensionDirOverride) : sanitize(config.packageName));
        config.deployment.toLocal.extensionPath = expandTilde(path.join(config.deployment.toLocal.localExtensionsBaseDir, extName));
        return cb();
      }
    } else {
      cb(); // Todo: Should probably return an error here
    }
  }

  /**
   * Return the current configuration which is the result of the merged default-config + the passed-in user-config.
   * @returns {*}
   */
  function getConfig() {
    return config;
  }

  /**
   * Run one or more tasks in a series.
   * @param tasks {array<string>} - Tasks, defined as array of strings.
   */
  function run(tasks) {

    process.emit('senseGo_onRunStart');
    try {
      gulp.series(tasks, function (done) {
        process.emit('senseGo_onRunFinished');
        process.emit('senseGo_onEnd');
        done();
      })();
    } catch (ex) {
      if (ex) {
        log(colors.red(ex.name), ex.message);
      }
    }
  }

  // ****************************************************************************************
  // Internal helpers
  // ****************************************************************************************

  /**
   * Create default tasks.
   * @private
   */
  function _createTasks() {

    const TaskCreator = require('./taskCreator');
    const taskCreator = new TaskCreator(gulp, plugins, config); // eslint-disable-line no-unused-vars
  }

  /**
   * Load the plugins and bind them to this.plugins.
   * @private
   */
  function _loadPlugins() {

    plugins = require('./pluginLoader');

  }

  /**
   * Returns an array of errors.
   * @param callback
   * @returns {*}
   * @private
   */
  function _validateConfig(callback) {

    let err = [];
    if (_.isEmpty(config.packageName)) {
      err.push('packageName cannot be null or empty.');
    }

    // Validate gulp-uglify options as we have breaking changes in gulp-uglify v3.0.0
    if (config.uglify) {
      if (config.uglify.beautify) {
        err.push('uglify.beautify is not an option anymore, remove it.');
      }
      if (config.uglify.preserveComments) {
        err.push('uglify.preserveComments is not an option anymore, replace it with output.commments = "some"');
      }
    }

    if (err.length > 0) {
      return callback(err);
    }
    return callback(null);

  }

  /**
   * Load a .yml file and return the object structure.
   * @param filePath
   * @returns {*}
   */
  function loadYml(filePath) {
    if (fs.existsSync(filePath)) {
      return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    }
    return {};
  }

  // ****************************************************************************************
  // Api definition
  // ****************************************************************************************
  return {
    init: init,
    getConfig: getConfig,
    loadYml: loadYml,
    run: run,
    gulp: gulp,
    tasks: gulp._registry._tasks,
    plugins: plugins
  };
};

module.exports = SenseGo;
