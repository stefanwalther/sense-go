'use strict';

function TaskUtils( plugins, globalConfig ) {

	function log ( taskConfig ) {

		if ( globalConfig.debugOutput ) {
			return plugins.debug( {title: taskConfig.taskName} , taskConfig);
		}
	}

	function debug ( taskConfig ) {
		if ( globalConfig.debugOutput ) {
			return plugins.debug( {title: taskConfig.taskName} )
		}
	}

	return {
		debug: debug,
		log: log
	}
}
module.exports = TaskUtils;
