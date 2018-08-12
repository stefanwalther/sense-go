// Local dependencies
const exec = require('child_process').exec;
const async = require('async');
const _ = require('lodash');

// Local dependencies
const log = require('fancy-log');
const colors = require('ansi-colors');

// Todo: There is some consolidation obvious to execute the commands and to collect the properties ...
function ShellTasks(gulp, plugins, config /* , taskUtils */) {

  gulp.task('shell', function (cbMain) {

    let tasks = [];
    if (config.shell && config.shell.enabled && config.shell.tasks && config.shell.tasks.length > 0) {

      config.shell.tasks.forEach(function (task) {
        if (task.enabled === true || task.enabled === undefined) {
          tasks.push(
            function (cb) {
              log('shell', colors.blue(_.truncate(task.cmd, {length: 75})));
              exec(task.cmd, function (err, stdout /* ,stderr */) {
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
      log(colors.gray('Task "shell" is disabled or no tasks are defined'));
      return gulp.src('.')
        .pipe(plugins.nop());
    }
  });

  // Todo: A lot of duplicated silly code here, consolidate !
  gulp.task('deploy:viaShell', function (cbMain) {

    let commands = [];
    if (config.deployment.viaShell && config.deployment.viaShell.enabled && (config.deployment.viaShell.cmd || config.deployment.viaShell.commands)) {

      // Legacy: consider the cmd prop on root.
      if (config.deployment.viaShell.cmd) {
        commands.push(
          function (cb) {
            log('shell', colors.blue(_.truncate(config.deployment.viaShell.cmd, {length: 75})));
            exec(config.deployment.viaShell.cmd, function (err, stdout /* ,stderr */) {
              if (err) {
                return cb(err);
              }
              return cb(null, stdout);
            });
          }
        );
        log('deploy:viaShell', colors.red('Tasks on the root of deployment.viaShell are deprecated, move it to "commands"'));
      }

      // Collect the commands
      if (config.deployment.viaShell.commands) {
        config.deployment.viaShell.commands.forEach(command => {
          if (command.enabled || command.enabled === undefined) {
            commands.push(
              function (cb) {
                log('shell', colors.blue(_.truncate(command.cmd, {length: 75})));
                exec(command.cmd, function (err, stdout /* ,stderr */) {
                  if (err) {
                    return cb(err);
                  }
                  return cb(null, stdout);
                });
              }
            );
          }
        });
      }

      async.parallel(commands, function (errors, results) {
        return cbMain(errors, results);
      });

    } else {
      log(colors.gray('Task "deployment:viaShell" is disabled'));
      gulp.src('.')
        .pipe(plugins.nop());
      return cbMain();
    }
  });

}

module.exports = ShellTasks;
