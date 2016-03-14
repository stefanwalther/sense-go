'use strict';

// local dependencies
var rimraf = require( 'rimraf' );

var testUtils = function () {

	function delDir( dir, done) {
		rimraf( dir, function ( err ) {
			if ( err ) {
				throw err;
			}
			done();
		} )
	}

	return {
		delDir: delDir
	}
};
module.exports = new testUtils;
