const path = require('path');
const composer = require('gulp-uglify/composer');
const uglifyEs = require('uglify-es');
const PluginError = require('plugin-error');

function UglifyTasks(gulp, plugins, config, taskUtils) {

  const minify = composer(uglifyEs, console);

  function uglify(taskConfig) {

    function createErrorHandler(taskName) {
      return function (err) {
        console.error('Error from ' + taskName + ' in uglify task', err.toString());
        throw new PluginError({
          plugin: taskName,
          message: err.message
        });
      };
    }

    return gulp.src(taskConfig.src)
      .on('error', createErrorHandler('gulp.src'))
      .pipe(taskUtils.debug(taskConfig))
      .pipe(plugins.stripDebug())
      .pipe(minify(taskConfig.uglify))
      .on('error', createErrorHandler('uglify'))
      .pipe(gulp.dest(taskConfig.dest))
      .on('error', createErrorHandler('dest'));

  }

  gulp.task('uglify:tmp', () => {
    return uglify({
      taskName: 'uglify:tmp',
      src: [path.join(config.uglifyTmp.src), '!' + path.join(config.uglifyTmp.srcExcluded)],
      dest: config.uglifyTmp.dest,
      uglify: config.uglify
    });
  });

}

module.exports = UglifyTasks;
