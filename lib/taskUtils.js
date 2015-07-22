'use strict';

function Utils( taskConfig ) {

}

Utils.prototype.log = function (  ) {
	if ( config.debugOutput ) {
		return plugins.debug( {title: taskConfig.taskName} )
	}
};

module.exports = Utils;
