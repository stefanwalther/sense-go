'use strict';
var path = require('path');

module.exports = {
  pattern: ['gulp-*', 'gulp.*'], // The glob(s) to search for
  config: path.join(__dirname, './../package.json'), 	// Where to find the plugins, by default searched up from process.cwd()
  scope: ['dependencies'], // Which keys in the config to look within
  replaceString: /^gulp(-|\.)/, // What to remove from the name of the module when adding it to the context
  camelize: true, // If true, transforms hyphenated plugins names to camel case
  lazy: true, // Whether the plugins should be lazy loaded on demand
  rename: {} // A mapping of plugins to rename
};
