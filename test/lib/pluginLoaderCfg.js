'use strict';
var path = require('path');

var pluginLoaderCfg = {
	pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
	config: path.join(__dirname, "./../package.json"), // where to find the plugins, by default searched up from process.cwd()
	scope: ['dependencies'], // which keys in the config to look within
	replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
	camelize: true, // if true, transforms hyphenated plugins names to camel case
	lazy: true, // whether the plugins should be lazy loaded on demand
	rename: {} // a mapping of plugins to rename
};

module.exports = pluginLoaderCfg;
