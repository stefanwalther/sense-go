'use strict';
var path = require('path');

function UglifyTasks(gulp, plugins, config, taskUtils) {

  function uglify(taskConfig) {
    return gulp.src(taskConfig.src)
      .pipe(taskUtils.debug(taskConfig))
      .pipe(plugins.stripDebug())
      .pipe(plugins.uglify(taskConfig.uglify))
      .pipe(gulp.dest(taskConfig.dest));
  }

  gulp.task('uglify:tmp', function () {
    return uglify({
      taskName: 'uglify:tmp',
      src: [path.join(config.uglifyTmp.src), '!' + path.join(config.uglifyTmp.srcExcluded)],
      dest: config.uglifyTmp.dest,
      uglify: config.uglify
    });
  });

}

module.exports = UglifyTasks;
