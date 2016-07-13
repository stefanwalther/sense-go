'use strict';

var chalk = require( 'chalk' );
var timestamp = require( 'time-stamp' );

module.exports = function log () {
	var time = '[' + chalk.grey( timestamp( 'HH:mm:ss' ) ) + ']';
	var args = [time].concat( [].slice.call( arguments ) );
	console.log.apply( console, args );
	return this;
};
