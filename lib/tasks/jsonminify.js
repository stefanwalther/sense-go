function JsonMinify(gulp, plugins, config, taskUtils) {

  function jsonminify(taskConfig) {
    return gulp.src(taskConfig.src)
      .pipe(taskUtils.debug(taskConfig))
      .pipe(plugins.jsonminify())
      .pipe(gulp.dest(taskConfig.dest));
  }

  gulp.task('minify:json:tmp', function (done) {
    return jsonminify({
      taskName: 'minify:json:tmp',
      src: [config.tmpDir + '/**/*.{json,qext}'],
      dest: config.tmpDir
    }, done);
  });
}

module.exports = JsonMinify;
