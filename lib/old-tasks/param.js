'use strict';


module.exports = function ( gulp, cfg, plugins ) {

	return {
		params: [ '1', '2' ],
		fn: function(param, cb) {
			console.log(param);
			cb();  // note that the callback must be called in order for the task
				   // to finish iterating through your params array
		}
	};

};

