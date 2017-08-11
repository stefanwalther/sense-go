'use strict';

// Local dependencies
const exec = require('child_process').exec;
const async = require('async');
const _ = require('lodash');

// Local dependencies
const gUtil = require('gulp-util');

function ShellTasks(gulp, plugins, config /* , taskUtils */) {

  gulp.task('shell', function (cbMain) {

    let tasks = [];
    if (config.shell && config.shell.enabled && config.shell.tasks && config.shell.tasks.length > 0) {

      config.shell.tasks.forEach(function (task) {
        if (task.enabled === true || task.enabled === undefined) {
          tasks.push(
            function (cb) {
              gUtil.log('shell', gUtil.colors.blue(_.truncate(task.cmd, {length: 75})));
              exec(task.cmd, function (err, stdout /*,stderr */) {
                if (err) {
                  return cb(err);
                }
                return cb(null, stdout);
              });
            }
          );
        }
      });

        async.parallel(tasks, function (errors, results) {
          return cbMain(errors, results);
        });

    } else {
      gUtil.log(gUtil.colors.gray('Task "shell" is disabled or no tasks are defined'));
      return gulp.src('.')
        .pipe(plugins.nop());
    }
  });

  gulp.task('deploy:viaShell', function (cb) {

    if (config.deployment.viaShell && config.deployment.viaShell.enabled && config.deployment.viaShell.cmd) {
      gUtil.log('deploy:viaShell', gUtil.colors.blue(_.truncate(config.deployment.viaShell.cmd, {length: 75})));
      exec(config.deployment.viaShell.cmd, function (err, stdout, stderr) {
        if (err) {
          console.log(stderr);
        }
        return cb(err);
      });
    } else {
      gUtil.log(gUtil.colors.gray('Task "deployment:viaShell" is disabled'));
      return gulp.src('.')
        .pipe(plugins.nop());
    }
  });

}

module.exports = ShellTasks;
