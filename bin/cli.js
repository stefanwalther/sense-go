#!/usr/bin/env node

'use strict';

/**
 * Borrowed from gulp
 * The MIT License (MIT)
 * Copyright (c) 2014-2015 Fractal <contact@wearefractal.com>
 */

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const Liftoff = require('liftoff');
const v8flags = require('v8flags');
const _ = require('lodash');
const colors = require('ansi-colors');

let log = require('./log');
const SenseGo = require('./../lib/index');
const pkg = require('../package');
const taskTree = require('./task-tree');
const extend = require('deep-extend');
let senseGo = new SenseGo();

// store a reference to the current CWD
process.env.INIT_CWD = process.cwd();

const cli = new Liftoff({
  name: 'sense-go',
  v8flags: v8flags
});

// exit with 0 or 1
let failed = false;
process.once('exit', function (code) {
  if (code === 0 && failed) {
    exit(1);
  }
});

/**
 * flags
 */
let versionFlag = argv.v || argv.version;
let debugFlag = argv.d || argv.debug;
let tasksFlag = argv.T || argv.tasks;
let hasSenseGoYml = fs.existsSync(path.join(process.cwd(), '.sense-go.yml'));
let hasSenseGoYmlLocal = fs.existsSync(path.join(process.cwd(), '.sense-go.local.yml'));
let hasSenseGoJs = fs.existsSync(path.join(process.cwd(), 'sense-go.js'));
let senseGoJsFile = (hasSenseGoJs) ? path.join(process.cwd(), 'sense-go.js') : null;
let tasks = argv._;
let toRun = tasks.length ? tasks : ['default'];

let simpleTasksFlag = argv['tasks-simple'];
let shouldLog = !argv.silent && !simpleTasksFlag;

if (!shouldLog) {
  log = function () {
  };
}

cli.on('respawn', function (flags, child) {
  const nodeFlags = colors.magenta(flags.join(', '));
  const pid = colors.magenta(child.pid);
  log('Node flags detected:', nodeFlags);
  log('Respawned to PID:', pid);
});

const cwd = argv.cwd || (hasSenseGoYml ? process.cwd() : null);

cli.launch({
  cwd: cwd
}, run);

function run(env) {

  console.log(''); // empty line
  log(colors.cyan('.: STARTING SENSE-GO :.'));

  process.on('senseGo_onInit', function () {
    //
  });
  process.on('senseGo_onEnd', function () {
    log(colors.cyan('.: SENSE-GO FINISHED :.'));
    console.log('');
  });

  senseGo.gulp.on('error', function (error) {
    if (debugFlag) {
      log(error.name + ' ' + colors.red('An error occurred. Here are the details:'));
      console.log('error', error);
    } else {
      log(error.name + ' ' + colors.red('An error occurred. Use -d to show details'));
    }
  });

  // chdir before requiring `sense-go.js` to allow users to chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    log('Working directory changed to', tildify(env.cwd));
  }

  if (versionFlag) {
    return log('sense-go CLI version: ', pkg.version);

  }

  if ((hasSenseGoYml || hasSenseGoYmlLocal) && !hasSenseGoJs) {
    let userConfig = senseGo.loadYml(path.join(process.cwd(), '.sense-go.yml'));
    log('Using the .sense-go.yml file ...');
    if (hasSenseGoYmlLocal) {
      let userConfigLocal = senseGo.loadYml(path.join(process.cwd(), '.sense-go.local.yml'));
      userConfig = extend(userConfig, userConfigLocal);
      log('Extending with settings in  the .sense-go.local.yml file ...');
    }

    senseGo.init(userConfig, function () {
      senseGo.run(toRun);
    });
  } else if (hasSenseGoJs) {
    log('Using the sense-go.js file ...');
    require(senseGoJsFile);
    senseGo.run(toRun);
  } else {

    log('Using the default sense-go settings ...');
    log('\t(neither package.json nor .sense-go.yml available ...)');
    senseGo.init(gulp, function () {
      senseGo.run(toRun);
    });
  }

}

// fix stdout truncation on windows
function exit(code) {
  if (process.platform === 'win32' && process.stdout.bufferSize) {
    process.stdout.once('drain', function () {
      process.exit(code);
    });
    return;
  }
  process.exit(code);
}
