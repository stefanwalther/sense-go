'use strict';

// core dependencies
var path = require('path');
var _ = require('lodash');

function ReplaceTasks( gulp, plugins, config, taskUtils) {

	function replace ( taskConfig ) {

		var replacements = {};
		replacements.pkg = config.pkg;
		_.extend(replacements, config.replacements);

		return gulp.src( taskConfig.src )
			.pipe( plugins.debug( {title: taskConfig.taskName, minimal: true} ) )
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
			taskName: 'replace:tmp',
			src: [path.resolve(config.replaceTmp.src)],
			dest: path.resolve(config.replaceTmp.dest)
		} );
	});
}

module.exports = {
	default: ReplaceTasks
};
