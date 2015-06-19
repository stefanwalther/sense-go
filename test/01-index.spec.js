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
var rimraf = require('rimraf');

var plugins = pluginLoader( pluginLoaderCfg );
var tasksCfg = {
  less: {
    options: {
      cwd: __dirname
    },
    src: './fixtures/less-each/**/*.less',
    dest: './tmp/'
  }
};

describe( 'gulp', function () {

  beforeEach( function ( done ) {

    rimraf('./tmp', function (  ) {
      var taskLoaderCfg = require( './taskLoaderConfig' )( plugins, tasksCfg );
      taskLoader( taskLoaderCfg );
      done();
    });

  } );

  //Todo: doesn't seem to work
  after( function ( done ) {
    rimraf('./tmp', function (  ) {
      done();
    })
  });

  describe( 'taskLoader', function () {
    it( 'returns tasks', function ( done ) {
      expect( gulp.tasks ).not.to.be.undefined;
      done();
    } );
  } );


  describe( 'less:each', function () {
    it( 'converts less for each less file', function ( done ) {

      gulp.start.apply( gulp, ['less-each'] );
      gulp.on( 'task_stop', function ( e ) {
        expect( path.join( __dirname, './tmp/root.css' ) ).to.be.a.file();
        expect( path.join( __dirname, './tmp/variables.css' ) ).to.be.a.file();
        expect( path.join( __dirname, './tmp/whatever.css' ) ).to.be.a.file();
        expect( path.join( __dirname, './tmp/root.css' ) ).to.have.content( fs.readFileSync( path.join( __dirname, './expected/less-each/root.css' ), 'utf8' ) );
        expect( path.join( __dirname, './tmp/whatever.css' ) ).to.have.content( fs.readFileSync( path.join( __dirname, './expected/less-each/whatever.css' ), 'utf8' ) );
        done();
      } );
    } );
  } );

} );
