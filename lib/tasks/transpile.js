'use strict';

function TranspileTask(gulp, plugins, config, taskUtils) {

  function transpile(taskConfig) {
    return gulp.src(taskConfig.src)
      .pipe(taskUtils.debug(taskConfig))
      .pipe(plugins.babel())
      .pipe(gulp.dest(taskConfig.dest));
  }

  gulp.task('transpile', function () {
    return transpile({
      src: config.transpile.src,
      dest: config.transpile.dest
    });
  });
}

module.exports = TranspileTask;
