const path = require('path');
const fs = require('fs-extra');
const PluginError = require('plugin-error');

function CopyTasks(gulp, plugins, config, taskUtils) {

  /**
	 * Generic copy task
	 * @param taskConfig { src, dest }
	 * @param done
	 */
  function copy(taskConfig) {
    return gulp.src(taskConfig.src)
      .pipe(plugins.plumber())
      .pipe(taskUtils.debug(taskConfig))
      .pipe(plugins.plumber.stop())
      .pipe(gulp.dest(taskConfig.dest));
  }

  gulp.task('copy:toTmp', function (done) {
    return copy({
      taskName: 'copy:toTmp',
      src: [
        path.resolve(config.srcDir + '/**/*.*'),
        '!' + path.resolve(config.srcDir + '/**/*.less')
      ],
      dest: config.tmpDir
    }, done);
  });

  gulp.task('copy:tmpToDev', function () {
    return copy({
      taskName: 'copy:tmpToDev',
      src: [
        path.resolve(config.tmpDir + '/**/*.*'),
        '!' + path.resolve(config.tmpDir + '/**/*.less'),
        // '!' + path.resolve( config.tmpDir + '/**/*.css' ),
        '!' + path.resolve(config.tmpDir + '/test/**/*.*')
      ],
      dest: config.buildDevDir
    });
  });

  gulp.task('copy:tmpToRelease', function () {
    return copy({
      taskName: 'copy:tmpToRelease',
      src: [
        path.resolve(config.tmpDir + '/**/*.*'),
        '!' + path.resolve(config.tmpDir + '/**/*.less'),
        // '!' + path.resolve(config.tmpDir + '/**/*.css'),
        '!' + path.resolve(config.tmpDir + '/test/**/*.*') // Todo: We shouldn't have this here, exclude the test folder ealier
      ],
      dest: config.buildReleaseDir
    });
  });

  gulp.task('deploy:toLocal', function () {

    const taskName = 'deploy:toLocal';

    if (config.deployment.toLocal.enabled === true) {

      fs.mkdirsSync(config.deployment.toLocal.extensionPath);
      if (!fs.existsSync(config.deployment.toLocal.extensionPath)) {
        throw new PluginError({
          plugin: taskName,
          message: 'Task deploy:toLocal cannot be started, there is not extensionPath defined.'
        });
      }

      return copy({
        taskName: taskName,
        src: [
          path.resolve(config.tmpDir + '/**/*.*'),
          '!' + path.resolve(config.tmpDir + '/**/*.less'),		// Don't include .less files
          '!' + path.resolve(config.tmpDir + '/test/**/*.*')	// Don't include any tests
        ],
        dest: config.deployment.toLocal.extensionPath
      });

    }
    return gulp.src('.')
      .pipe(plugins.nop());

  });

}

module.exports = CopyTasks;

