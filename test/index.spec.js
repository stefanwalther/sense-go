'use strict';
var fs = require( 'fs' );
var path = require( 'path' );
var gulp = require( 'gulp' );
var chai = require( 'chai' );
chai.use( require( 'chai-fs' ) );
var expect = chai.expect;
var pluginLoaderCfg = require( './pluginLoaderCfg.js' );
var pluginLoader = require( 'gulp-load-plugins' );
var taskLoader = require( 'gulp-simple-task-loader' );

var plugins = pluginLoader( pluginLoaderCfg );
var tasksCfg = {
  less: {
    cwd: __dirname,
    src: './fixtures/less/**/*.less',
    dest: './tmp/'
  }
};

describe( 'gulp', function () {

  beforeEach( function () {
    var taskLoaderCfg = require( './taskLoaderConfig' )( plugins, tasksCfg );
    taskLoader( taskLoaderCfg );
  } );

  it( 'has tasks', function ( done ) {
    expect( gulp.tasks ).not.to.be.undefined;
    done();
  } );

  it( 'can be tested', function ( done ) {

    gulp.start.apply( gulp, ['less'] );
    gulp.on( 'task_stop', function ( e ) {
      expect( path.join( __dirname, './tmp/root.css' ) ).to.be.a.file();
      expect( path.join( __dirname, './tmp/variables.css' ) ).to.be.a.file();
      expect( path.join( __dirname, './tmp/root.css' ) ).to.have.content( fs.readFileSync( path.join( __dirname, './expected/less/root.css' ), 'utf8' ) );
      done();
    } );

  } );

} );
