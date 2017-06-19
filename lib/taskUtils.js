'use strict';

function TaskUtils( plugins, globalConfig ) {

	function log ( taskConfig ) {

		if ( globalConfig.debugOutput && process.env.NODE_ENV !== 'test' ) {
			return plugins.debug( {title: taskConfig.taskName} , taskConfig);
		} else {
			return plugins.nop();
		}
	}

	function debug ( taskConfig ) {
		if ( globalConfig.debugOutput && process.env.NODE_ENV !== 'test' ) {
			return plugins.debug( {title: taskConfig.taskName} )
		} else {
			return plugins.nop();
		}
	}

	return {
		debug: debug,
		log: log
	}
}
module.exports = TaskUtils;
