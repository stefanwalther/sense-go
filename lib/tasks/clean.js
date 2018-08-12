const path = require('path');
const del = require('del');
const _ = require('lodash');

function CleanTasks(gulp, plugins, config /* , taskUtils */) {

  /**
	 * Generic delete/clean task
	 * @param taskConfig { src }
	 * @param done callback
	 * @returns {callback}
	 * @param delOptions
	 */
  const clean = function (taskConfig, delOptions, done) {
    return del(taskConfig.src, delOptions).then(function (/* paths */) {
      // Paths.forEach( function( path) {
      // 	taskUtils.log( taskConfig.taskName, colors.blue( path ));
      // });
      // taskUtils.log( taskConfig.taskName, colors.green( paths.length + ' items' ) );
      done();
    });
  };

  gulp.task('clean:tmpIllegal', function (done) {
    return clean({
      taskName: 'clean:tmpIllegal',
      src: [
        config.tmpDir + '/**/*.*',
        '!' + config.tmpDir + '/**/*.{png,jpg,jpeg,json,qext,txt,js,css,eot,svg,ttf,woff,woff2,html,htm,wbl,svg}'
      ]
    }, {}, done);
  });

  gulp.task('clean:tmp', function (done) {
    return clean({
      taskName: 'clean:tmp',
      src: path.resolve(config.tmpDir)
    }, {}, done);
  });

  gulp.task('clean:buildDev', function (done) {
    return clean({
      taskName: 'clean:buildDev',
      src: path.resolve(config.buildDevDir)
    }, {}, done);
  });

  gulp.task('clean:buildRelease', function (done) {
    return clean({
      taskName: 'clean:buildRelease',
      src: path.resolve(config.buildReleaseDir)
    }, {}, done);
  });

  gulp.task('clean:localExtensionDir', function (done) {

    if (!_.isEmpty(config.packageName && config.deployment.toLocal.enabled === true)) {
      return clean({
        taskName: 'clean:localExtensionDir',
        src: config.toLocal.extensionPath
      }, {force: true}, done);
    }
    done();

  });

  return {
    clean: clean
  };

}

module.exports = CleanTasks;
