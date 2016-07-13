> Uglify & minifies JavaScript files

**`uglify:tmp`**
* Uglify all JavaScript files.
* Options:  
  * `tmpDir`
  * `uglify*` - All options directly passed to `gulp-uglify`, e.g.
    * `uglify.mangle`
    * `uglify.beautify`
    * `uglify.preserveComments`
* Excluded:  
  * All files matching the pattern `*.min.js`
