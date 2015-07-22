'use strict';
var path = require('path');

function ReplaceTasks( gulp, plugins, config, taskUtils) {

	function replace ( taskConfig, done ) {

		var replacements = {};
		replacements.pkg = config.pkg;

		gulp.src( taskConfig.src )
			.pipe( plugins.debug( {title: 'replace:', minimal: true} ) )
			.pipe( plugins.replaceTask( {
				patterns: [
					{
						json: replacements
					},
					{
						match: 'timestamp',
						replacement: new Date().getTime()
					}
				]
			} ) )
			.pipe( gulp.dest( taskConfig.dest ) )
			.on( 'end', function () {
				done();
			} );
	}

	gulp.task('replace:tmp', function ( done ) {
		replace({
			src: [path.resolve(config.tmpDir, '**/*.{qext,json,js,html,xml,yml,txt}')],
			dest: path.resolve(config.tmpDir)
		}, done );
	});

}

module.exports = ReplaceTasks;
