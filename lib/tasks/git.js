'use strict';

const parseArgs = require('minimist');

function GitTasks(gulp, plugins, config, taskUtils) {

  function getArgs() {

    const defaultArgs = {
      string: ['message'],
      default: {

        /**
				 * Default message
				 */
        m: '-'
      }
    };
    const cliArgs = parseArgs(process.argv.slice(2), defaultArgs);
    return cliArgs;
  }

  gulp.task('git:push', function (done) {

    const target = 'origin';
    const source = 'master';

    taskUtils.debug({taskName: 'git:push'});
    return plugins.git.push(target, source, function (err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  gulp.task('git:commit', function (done) {

    const cliArgs = getArgs();

    return gulp.src('./')
      .pipe(taskUtils.debug({taskName: 'git:commit'}))
      .pipe(plugins.git.commit(cliArgs.message))
      .on('end', function () {
        done();
      });
  });

  gulp.task('git:add', function (done) {
    return plugins.git.exec({args: 'add .', log: false}, function (/* err, stdout */) {
      done();
    });
  });
}

module.exports = GitTasks;
