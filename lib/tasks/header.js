'use strict';

const path = require('path');

function HeaderTasks(gulp, plugins, config, taskUtils) {

  const header = function (taskConfig, done) {
    return gulp.src(taskConfig.src)
      .pipe(taskUtils.debug(taskConfig))
      .pipe(plugins.header(taskConfig.opts.template, taskConfig.opts.context))
      .pipe(gulp.dest(taskConfig.dest))
      .on('end', function () {
        if (typeof done === 'function') {
          done();
        }
      });
  };

  gulp.task('header-js:tmp', function (done) {

    let tmpl = [
      '/*!\r\n',
      '* <%= pkg.name %> - <%= pkg.description %>',
      '* --',
      '* @version v<%= pkg.version %>',
      '* @link <%= (typeof(pkg.homepage) === "string") ? (pkg.homepage) : pkg.repository.url %>',
      '* @author <%= (typeof(pkg.author) === "object") ? (pkg.author.name) : pkg.author %>',
      '* @license <%= pkg.license %>',
      '*/'].join('\r\n');
    tmpl += '\r\n\r\n';

    return header({
      taskName: 'header-js:tmp',
      src: [
        path.resolve(config.tmpDir + '/**/*.js'),
        '!' + path.resolve(config.tmpDir + '/**/*.min.js')
      ],
      opts: {
        template: tmpl,
        context: {
          pkg: config.pkg || {}
        }
      },
      dest: config.tmpDir
    }, done);
  });

  return {
    header: header
  };
}

module.exports = HeaderTasks;
