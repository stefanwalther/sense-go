'use strict';
var path = require('path');

function ReplaceTasks( gulp, plugins, config, taskUtils) {

	function replace ( taskConfig ) {

		var replacements = {};
		replacements.pkg = config.pkg;

		return gulp.src( taskConfig.src )
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
			.pipe( gulp.dest( taskConfig.dest ) );
	}

	gulp.task('replace:tmp', function ( ) {
		return replace({
			src: [path.resolve(config.tmpDir, '**/*.{qext,json,js,html,htm,xml,yml,txt}')],
			dest: path.resolve(config.tmpDir)
		} );
	});

}

module.exports = ReplaceTasks;
