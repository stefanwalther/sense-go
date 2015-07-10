'use strict';
var gUtil = require( 'gulp-util' );

module.exports = function ( /* gulp , cfg, plugins */ ) {

	/**
	 * Just a test task
	 */
	return function () {
		return gUtil.log( gUtil.colors.blue( 'test task' ) );
	};
};