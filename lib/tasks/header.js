'use strict';

const path = require('path');
const _ = require('lodash');

function HeaderTasks(gulp, plugins, config, taskUtils) {

  /**
   *
   * @param taskConfig
   * @param done
   */
  const header = function (taskConfig, done) {
    console.log('taskConfig', taskConfig);
    return gulp.src(taskConfig.src)
      .pipe(taskUtils.debug(taskConfig))
      .pipe(plugins.header(taskConfig.opts.template, taskConfig.opts.context))
      .on('error', function (err) {
        console.log('err', err);
      })
      .on('error', function (err) {
        console.log('err', err);
      })
      .pipe(gulp.dest(taskConfig.dest))
      .on('error', function (err) {
        console.log('err', err);
      })
      .on('end', function () {
        if (typeof done === 'function') {
          done();
        }
      });
  };

  gulp.task('header-js:tmp', function (done) {

    // Normalize the pkg, in case that some information is missing in the project's package.json file
    let pkgNormalized = {
      name: _.get(config.pkg, 'name', '<name>'),
      version: _.get(config.pkg, 'version', '<version>'),
      description: _.get(config.pkg, 'description', '<description>'),
      link: _.get(config.pkg, 'homepage', _.get(config.pkg, 'repository.url', '')),
      author: _.get(config.pkg, 'author', _.get(config.pkg, 'author.name', '')),
      license: _.get(config.pkg, 'license', 'unknown')
    };

    // console.log('pkgNormalized', pkgNormalized);

    let tmpl = [
      '/*!\n',
      '* <%= pkg.name %> - <%= pkg.description %>',
      '* --',
      '* @version v<%= pkg.version %>',
      '* @link <%= pkg.link %>',
      '* @author <%= pkg.author %>',
      '* @license <%= pkg.license %>',
      '*/'].join('\n');
    tmpl += '\n\n';

    return header({
      taskName: 'header-js:tmp',
      src: [
        path.resolve(config.tmpDir + '/**/*.js'),
        '!' + path.resolve(config.tmpDir + '/**/*.min.js')
      ],
      opts: {
        template: tmpl,
        context: {
          pkg: pkgNormalized
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
