'use strict';
var gulp = require( 'gulp' );
var tag_version = require( 'gulp-tag-version' );
var bump = require( 'gulp-bump' );
var git = require( 'gulp-git' );
var filter = require('gulp-filter');

gulp.task( 'bump', function () {

} );

//https://www.npmjs.com/package/gulp-tag-version
function inc ( importance ) {
	// get all the files to bump version in
	return gulp.src( ['./package.json'] )
		.pipe( bump( {type: importance} ) )
		.pipe( gulp.dest( './' ) )
		.pipe( git.commit( 'bumps package version' ) )
		.pipe( filter( 'package.json' ) )
		.pipe( tag_version() );
}

gulp.task( 'patch', function () { return inc( 'patch' ); } );
gulp.task( 'feature', function () { return inc( 'minor' ); } );
gulp.task( 'release', function () { return inc( 'major' ); } );
gulp.task( 'default', [] );
