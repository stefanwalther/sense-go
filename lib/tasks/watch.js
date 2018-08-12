function WatchTasks(gulp, plugins, config /* , taskUtils */) {

  gulp.task('watch:build', function () {
    gulp.watch(
      config.watch,
      {
        readDelay: 10,
        usePolling: true,
        interval: 50
      },
      gulp.series('build'));
  });
}

module.exports = WatchTasks;
