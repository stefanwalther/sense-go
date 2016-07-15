'use strict';

// local dependencies
var del = require('del');

var testUtils = function () {

	function delDir( dir, done) {
		return del( dir ).then( function() {
			return done();
		});
	}

	return {
		delDir: delDir
	}
};
module.exports = new testUtils;
