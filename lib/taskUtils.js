'use strict';

function TaskUtils( plugins, config ) {

	function log ( taskConfig ) {
		if ( config.debugOutput ) {
			return plugins.debug( {title: taskConfig.taskName} )
		}
	}

	function debug ( taskConfig ) {
		if ( config.debugOutput ) {
			return plugins.debug( {title: taskConfig.taskName} )
		}
	}

	return {
		debug: debug,
		log: log
	}
}

module.exports = TaskUtils;
