> Uglify & minifies JavaScript files

**General uglify options**
  * `uglify*` - All options directly passed to `gulp-uglify`, e.g.
    * `uglify.mangle`
    * `uglify.beautify`
    * `uglify.compress`
    * `uglify.preserveComments` - *(Default: 'license')*
    
Further options can be passed according to the [gulp-uglify](https://github.com/terinjokes/gulp-uglify) documentation.

**`uglify:tmp`**
* Uglify all JavaScript files.
* Options:  
  * `uglifyTmp.src` - Included source files. *(Default: `./.tmp/**/*.js`)*
  * `uglifyTmp.srcExcluded` - Excluded source files *(Default: `./.tmp/**/*.min.js`)*

