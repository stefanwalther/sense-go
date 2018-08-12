const timestamp = require( 'time-stamp' );
const colors = require('ansi-colors');

module.exports = function log () {
	let time = '[' + colors.grey( timestamp( 'HH:mm:ss' ) ) + ']';
	let args = [time].concat( [].slice.call( arguments ) );
	console.log.apply( console, args );
	return this;
};
