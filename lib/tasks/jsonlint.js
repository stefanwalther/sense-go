function JsonLint(gulp, plugins, config, taskUtils) {

  function jsonlint(taskConfig, done) {
    gulp.src(taskConfig.src)
      .pipe(taskUtils.debug(taskConfig))
      .pipe(plugins.jsonlint())
      .pipe(plugins.jsonlint.failOnError())
      .pipe(plugins.jsonlint.reporter(jsonLintReporter))
      .on('end', function () {
        done();
      });
  }

  function jsonLintReporter(file /* , arg1, arg2 */) {
    taskUtils.log('File ' + file.path + ' is not valid JSON.');
  }

  gulp.task('jsonlint:tmp', function (done) {
    return jsonlint({
      taskName: 'jsonlint:tmp',
      src: [config.tmpDir + '/**/*.{json,qext}']
    }, done);
  });
}

module.exports = JsonLint;
