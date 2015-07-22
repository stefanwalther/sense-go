'use strict';

module.exports = function ( gulp, cfg, plugins ) {

	return function () {
		return plugins.git.push('origin', 'master', function (err) {
				if (err) throw err;
			});
	};
};

