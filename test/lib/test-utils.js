'use strict';

// local dependencies
var del = require('del');

var testUtils = function () {

	function delDir( dir, done) {
		del( dir ).then( function() {
			done();
		});
	}

	return {
		delDir: delDir
	}
};
module.exports = new testUtils;
