'use strict';

function TaskUtils( plugins, config ) {

	function log ( taskConfig ) {
		if ( config.debugOutput ) {
			return plugins.debug( {title: taskConfig.taskName} )
		}
	}

	function logMsg(taskConfig) {
		return plugins.debug( {title: taskConfig.taskName}, 'msg');
	}

	function debug ( taskConfig ) {
		if ( config.debugOutput ) {
			return plugins.debug( {title: taskConfig.taskName} )
		}
	}

	return {
		debug: debug,
		log: log,
		logMsg: logMsg
	}
}
module.exports = TaskUtils;
